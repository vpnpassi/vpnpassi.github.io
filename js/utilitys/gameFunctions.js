import { showToast, switchScene } from '../utilitys/utils.js';

// PLAYER
export function addPlayer(scene, objectsLayer, layerName, spriteKey, animKey, size) {
    const playerStart = objectsLayer.objects.find(obj => obj.name === layerName);
    if (!playerStart) {
        showToast(scene, 'Achtung', 'Layer ' + layerName + ' in der Map nicht gefunden.');
        return;
    }

    const player = scene.physics.add.sprite(0, 0, spriteKey, 'idle-down-1.png').setDisplaySize(size, size);
    player.setPosition(playerStart.x + (player.body.width / 2), playerStart.y + (player.body.height / 2));
    
    player.anims.play(animKey, true);

    return player;
}

// PLAYER MOVEMENT
export function movePlayer(scene, level, timeLimit, deltaX, deltaY) {
    scene.isMoving = true;

    let targetX = scene.player.x + deltaX;
    let targetY = scene.player.y + deltaY;

    let box = getBoxAtPosition(scene, targetX, targetY);
    if (box) {
        pushBox(scene.player, box, scene, level, timeLimit);
        scene.isMoving = false;
        return;
    }

    if (isPositionFree(scene, targetX, targetY)) {
        scene.tweens.add({
            targets: scene.player,
            x: targetX,
            y: targetY,
            duration: 200,
            onComplete: () => {
                scene.isMoving = false;
                scene.player.body.reset(targetX, targetY);
                checkBoxGoalState(scene, level, timeLimit);
            }
        });
    } else {
        scene.isMoving = false;
    }
}

// BOX MOVEMENT
export function pushBox(player, box, scene, level, timeLimit) {
    let direction = new Phaser.Math.Vector2();

    if (scene.cursors.left.isDown) {
        direction.x = -1;
    } else if (scene.cursors.right.isDown) {
        direction.x = 1;
    } else if (scene.cursors.up.isDown) {
        direction.y = -1;
    } else if (scene.cursors.down.isDown) {
        direction.y = 1;
    }

    let newPosX = box.x + direction.x * scene.gridSize;
    let newPosY = box.y + direction.y * scene.gridSize;

    if (isPositionFree(scene, newPosX, newPosY)) {
        scene.tweens.add({
            targets: box,
            x: newPosX,
            y: newPosY,
            duration: 200,
            onComplete: () => {
                box.body.reset(newPosX, newPosY);
                checkBoxGoalState(scene, level, timeLimit);
            }
        });
    }
}
function getBoxAtPosition(scene, x, y) {
    let boxes = scene.boxGroup.getChildren();
    for (let i = 0; i < boxes.length; i++) {
        if (Phaser.Math.Distance.Between(boxes[i].x, boxes[i].y, x, y) < scene.gridSize / 2) {
            return boxes[i];
        }
    }
    return null;
}

// COLLISION DETECTION
function isPositionFree(scene, x, y) {
    const tile = scene.collisionLayer.getTileAtWorldXY(x, y);
    if (tile && tile.collides) {
        return false;
    }

    if (getBoxAtPosition(scene, x, y)) {
        return false;
    }

    return true;
}

// BOXES, GOALS & GOLD (ALL KIND OF ELEMENTS)
export function addElement(scene, objectsLayer, layerName, layerGroup, spriteKey, spriteIndex, animKey, size) {
    objectsLayer.objects.forEach(object =>{
        if (object.name === layerName) {
            var element = scene.physics.add.sprite(object.x + (object.width / 2), object.y + (object.height / 2), spriteKey, spriteIndex).setDisplaySize(size - 16, size - 16);
            element.body.setSize(size + 16, size + 16);
            layerGroup.add(element);
            if (animKey) {
                element.anims.play(animKey, true);
            }
        }
    });
}

// COLLECT GOLD
export function collectCoin (player, coin) {
    coin.disableBody(true, true);
    const goldInstance = player.scene.registry.get('gameStatsGoldValue');
    if (goldInstance && typeof goldInstance.gainGold === 'function') {
        showToast(player.scene, 'Erfolg', 'Gold gesammelt.');
        goldInstance.gainGold(1);
    } else {
        showToast(player.scene, 'Achtung', 'Gold Instanz nicht gefunden oder gainGold ist keine Funktion');
    }
}

// GOALCHECK
export function checkBoxGoalState(scene, level, timeLimit) {
    const goals = scene.goalGroup.getChildren();
    const boxes = scene.boxGroup.getChildren();
    let allGoalsCovered = true;
    let uncoveredGoals = 0;

    let blockedBoxCount = 0;
    let totalBoxesCounted = 0;

    scene.timeLimitEvent = scene.time.addEvent({
        delay: 1000,
        repeat: timeLimit - 1,
        callback: () => {
            timeLimit--;
            if (timeLimit <= 0) {
                scene.timeLimitEvent.remove(false);
                scene.timeLimitEvent = null;
                onTimeLimitOrBoxBlockedReached(scene, 'Zeit abgelaufen!', level);
            }
        }
    });

    for (let i = 0; i < goals.length; i++) {
        const goal = goals[i];
        const boxOnGoal = boxes.some(box => Phaser.Math.Distance.Between(box.x, box.y, goal.x, goal.y) < scene.gridSize / 2);
        if (!boxOnGoal) {
            allGoalsCovered = false;
            uncoveredGoals++;
        }
    }

    scene.registry.set('uncoveredGoals', uncoveredGoals);

    if (allGoalsCovered) {
        scene.timeLimitEvent.remove(false);
        scene.timeLimitEvent = null;
        onAllGoalsCovered(scene, level, timeLimit);
        return;
    }

    for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i];
        const x = box.x;
        const y = box.y;


        const onGoal = goals.some(goal => Phaser.Math.Distance.Between(goal.x, goal.y, x, y) < scene.gridSize / 2);
        
        totalBoxesCounted++;

        if (onGoal) {
            blockedBoxCount++;
            continue;
        }

        const blockedAbove = !isPositionFree(scene, x, y - scene.gridSize);
        const blockedBelow = !isPositionFree(scene, x, y + scene.gridSize);
        const blockedLeft = !isPositionFree(scene, x - scene.gridSize, y);
        const blockedRight = !isPositionFree(scene, x + scene.gridSize, y);

        const verticalBlocked = blockedAbove || blockedBelow;
        const horizonalBlocked = blockedLeft || blockedRight;

        if (verticalBlocked && horizonalBlocked) {

            blockedBoxCount++;

        }

        if (blockedBoxCount === totalBoxesCounted) {
            scene.timeLimitEvent.remove(false);
            scene.timeLimitEvent = null;
            onTimeLimitOrBoxBlockedReached(scene, 'Verloren!', level);
            return;
        }

    }

}

function onAllGoalsCovered(scene, level, timeLimit) {
    scene.scene.stop('GUIScene');
    scene.scene.stop('GameScene');
    scene.scene.launch('PopUpScene', {
        from: scene,
        headline: 'Gewonnen!',
        level_id: level,
        buttons: [
            {
                key: 'exitButtonBG',
                from: scene,
                functionToCall: function() {
                    switchScene(this.scene, 'MenuScene');
                },
            },
            {
                key: 'redoAdButtonBG',
                from: scene,
                functionToCall: function() {
                    scene.scene.launch('AdScene', {
                        callback: () => {
                            switchScene(this.scene, 'GameScene', level, timeLimit);
                        },
                    });
                },
            },
            {
                key: 'nextButtonBG',
                from: scene,
                functionToCall: function() {
                    switchScene(this.scene, 'GameScene', level + 1, timeLimit);
                },
            },
        ],
    });
    scene.input.enabled = false;
}

function onTimeLimitOrBoxBlockedReached(scene, headline, level) {
    scene.scene.stop('GUIScene');
    scene.scene.stop('GameScene');
    scene.scene.launch('PopUpScene', {
        from: scene,
        headline: headline,
        buttons: [
            {
                key: 'exitButtonBG',
                from: scene,
                functionToCall: function() {
                    switchScene(this.scene, 'MenuScene');
                },
            },
            {
                key: 'redoAdButtonBG',
                from: scene,
                functionToCall: function() {
                    scene.scene.launch('AdScene', {
                        callback: () => {
                            switchScene(this.scene, 'GameScene', level, timeLimit);
                        },
                    });
                },
            },
            {
                key: 'redoGoldButtonBG',
                from: scene,
                functionToCall: function() {
                    if (scene.registry.get('gameStatsGoldValue').gold >= 30) {
                        const goldInstance = scene.registry.get('gameStatsGoldValue');
                        goldInstance.loseGold(30);
                        switchScene(this.scene, 'GameScene', level, timeLimit);
                    } else {
                        showToast(this.scene, 'Achtung', 'Nicht genug Gold.');
                    }
                },
            },
        ],
    });
    scene.input.enabled = false;
}