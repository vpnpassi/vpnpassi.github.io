import { Gold } from '../methods/gold.js';

// PLAYER
export function addPlayer(scene, objectsLayer, layerName, spriteKey, animKey, size) {
    const playerStart = objectsLayer.objects.find(obj => obj.name === layerName);
    if (!playerStart) {
        console.error(`Layer ${layerName} not found in the map.`);
        return;
    }

    const player = scene.physics.add.sprite(0, 0, spriteKey, 'idle-down-1.png').setDisplaySize(size, size);
    player.setPosition(playerStart.x + (player.body.width / 2), playerStart.y + (player.body.height / 2));
    
    player.anims.play(animKey, true);

    return player;
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
    const gold = player.scene.registry.get('gameStatsGoldValue');
    gold.gainGold(1);
}

// PLAYER MOVEMENT
export function movePlayer(scene, deltaX, deltaY) {
    scene.isMoving = true;

    let targetX = scene.player.x + deltaX;
    let targetY = scene.player.y + deltaY;

    let box = getBoxAtPosition(scene, targetX, targetY);
    if (box) {
        pushBox(scene.player, box, scene);
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
                checkBoxGoalState(scene);
            }
        });
    } else {
        scene.isMoving = false;
    }
}

// BOX MOVEMENT
export function pushBox(player, box, scene) {
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
                checkBoxGoalState(scene);
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

// GOALCHECK
export function checkBoxGoalState(scene) {
    const goals = scene.goalGroup.getChildren();
    const boxes = scene.boxGroup.getChildren();
    let allGoalsCovered = true;

    for (let i = 0; i < goals.length; i++) {
        const goal = goals[i];
        const boxOnGoal = boxes.some(box => Phaser.Math.Distance.Between(box.x, box.y, goal.x, goal.y) < scene.gridSize / 2);
        if (!boxOnGoal) {
            allGoalsCovered = false;
            console.log("ES SIND NOCH NICHT ALLE ZIELE ERREICHT!");
            break;
        }
    }

    if (allGoalsCovered) {
        console.log("ALLE ZIELE SIND ERREICHT! GEWONNEN!");
        return;
    }

    for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i];
        const x = box.x;
        const y = box.y;

        const onGoal = goals.some(goal => Phaser.Math.Distance.Between(goal.x, goal.y, x, y) < scene.gridSize / 2);
        if (onGoal) continue;

        const blockedAbove = !isPositionFree(scene, x, y - scene.gridSize);
        const blockedBelow = !isPositionFree(scene, x, y + scene.gridSize);
        const blockedLeft = !isPositionFree(scene, x - scene.gridSize, y);
        const blockedRight = !isPositionFree(scene, x + scene.gridSize, y);

        const verticalBlocked = blockedAbove || blockedBelow;
        const horizonalBlocked = blockedLeft || blockedRight;

        if (verticalBlocked && horizonalBlocked) {
            console.log("VERLOREN!");
            break;
        }
    }

}

// ANIMATION
export function addAnimation(scene, animKey, spriteKey, start, end, prefix, suffix, repeat, frameRate) {
    if (!scene.anims.get(animKey)) {
        scene.anims.create({
            key: animKey,
            frames: scene.anims.generateFrameNames(spriteKey, { start: start, end: end, prefix: prefix, suffix: suffix }),
            repeat: repeat,
            frameRate: frameRate
        });
    } 
}

// SCENE SWITCHER
export function switchScene(currentScene, targetScene, level, menuScene, guiScene) {
    currentScene.scene.stop(targetScene);
    currentScene.scene.start(targetScene, {level: level});
    currentScene.scene.stop(menuScene);
    currentScene.scene.stop(guiScene);
    currentScene.scene.launch(guiScene, {
        active: true, 
        from: targetScene,
        level: level
    });
}

// BACKGROUND 
export function preloadBackground(scene) {
    scene.load.image('bg', `assets/images/background.png`);
}
export function createBackground(scene) {
    var backgroundImage = scene.add.image(0, 0, 'bg');
    backgroundImage.setOrigin(0.5, 0.5); 
    backgroundImage.x = scene.cameras.main.width / 2;
    backgroundImage.y = scene.cameras.main.height / 2;

    var scaleX = scene.cameras.main.width / backgroundImage.width;
    var scaleY = scene.cameras.main.height / backgroundImage.height;
    var scale = Math.max(scaleX, scaleY);
    backgroundImage.setScale(scale);

    scene.scale.on('resize', function (gameSize) {
        var width = gameSize.width;
        var height = gameSize.height;

        scene.cameras.resize(width, height);

        backgroundImage.setPosition(width / 2, height / 2);

        scaleX = width / backgroundImage.width;
        scaleY = height / backgroundImage.height;
        scale = Math.max(scaleX, scaleY);
        backgroundImage.setScale(scale);
    });
}