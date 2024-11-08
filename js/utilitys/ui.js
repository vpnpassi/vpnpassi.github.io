import { showToast, switchScene } from '../utilitys/utils.js';

// STATSBUTTONS
export function createStatsGroup(scene, statsGroup) {

    var group = scene.add.container();
    var centerX = scene.scale.baseSize.width / 2;
    var centerY = 96;

    var groupWidths = statsGroup.map(buttonGroups => calculateGUIGroupWidth(scene, buttonGroups.value, buttonGroups.buttonIconGroup));

    statsGroup.forEach((buttonGroups, index) => {
        var offsetX = (index - 1) * (groupWidths[index] + 128);
        var buttonGroup = createGameStatsButtonGroup(scene, buttonGroups.key, buttonGroups.value, buttonGroups.buttonIconGroup);
        if (index === 1) {
            buttonGroup.setPosition(centerX + offsetX - 24, centerY);
        } else {
            buttonGroup.setPosition(centerX + offsetX, centerY);
        }
        group.add(buttonGroup);

        buttonGroups.textObject = buttonGroup.textObject;
    });

    function createGameStatsButtonGroup(scene, key, value, buttons) {
        var buttonGroup = scene.add.container();
    
        var gameStatsCurrentValue = scene.add.text(0, 0, String(value), { fontSize: '32px', fontFamily: 'Fredoka', color: '#ffffff', align: 'right', fontStyle: 'bold' }).setOrigin(0.5, 0.5);
        var textWidth = gameStatsCurrentValue.width;
        var leftIcon = createGameStatsButtonIcon(scene, buttons[0].icon);
        var rightIcon = createGameStatsButtonIcon(scene, buttons[2].icon);
        var middleIcon = createGameStatsButtonIcon(scene, buttons[1].icon);
    
        if (textWidth <= middleIcon.displayWidth) {
            leftIcon.setPosition(-middleIcon.displayWidth / 2 - leftIcon.displayWidth / 2, 0);
            rightIcon.setPosition(middleIcon.displayWidth / 2 + rightIcon.displayWidth / 2, 0);
        } else {
            leftIcon.setPosition(-textWidth / 2 - leftIcon.displayWidth / 2, 0);
            rightIcon.setPosition(textWidth / 2 + rightIcon.displayWidth / 2, 0);
        }
        middleIcon.setPosition(0, 0);
        gameStatsCurrentValue.setPosition(0, 0);
    
        buttonGroup.add(leftIcon);
        buttonGroup.add(rightIcon);
        buttonGroup.add(middleIcon);
        buttonGroup.add(gameStatsCurrentValue);
    
        if (textWidth <= middleIcon.displayWidth) {
            buttonGroup.setSize(leftIcon.displayWidth + middleIcon.displayWidth + rightIcon.displayWidth, leftIcon.displayHeight);
        } else {
            buttonGroup.setSize(leftIcon.displayWidth + textWidth + rightIcon.displayWidth, leftIcon.displayHeight);
        }
    
        buttonGroup.setInteractive().on('pointerdown', () => {
            switchScene(this.scene, 'ShopScene');
        });
        buttonGroup.input.cursor = 'pointer';
    
        buttonGroup.textObject = gameStatsCurrentValue;
    
        return buttonGroup;
    }
    function createGameStatsButtonIcon(scene, button) {
        var icon = scene.add.sprite(button.x, button.y, button.key).setDisplaySize(button.width, button.height).setOrigin(0.5, 0.5);
        return icon;
    }
    function calculateGUIGroupWidth(scene, value, buttons) {
        var gameStatsCurrentValue = scene.add.text(0, 0, value).setStyle({fontSize: '32px', fontFamily: 'Fredoka', color: '#ffffff', align: 'right', fontStyle: 'bold'});
        var textWidth = gameStatsCurrentValue.width;
    
        var leftIconWidth = buttons[0].icon.width;
        var middleIconWidth = buttons[1].icon.width;
        var rightIconWidth = buttons[2].icon.width;
    
        if (textWidth <= middleIconWidth) {
            var totalWidth = leftIconWidth + middleIconWidth + rightIconWidth;
            gameStatsCurrentValue.destroy();
            return totalWidth;
        } else {
            var totalWidth = leftIconWidth + textWidth + rightIconWidth;
            gameStatsCurrentValue.destroy();
            return totalWidth;
        }
    
    }

    return group;

}

// GUI-ICON-BUTTONS
export function createGUIIconGroup(scene, icons) {

    var group = scene.add.container();

    icons.forEach(icon => {
        if (icon.activeScene) {
            var iconGroup = createIconButton(scene, icon.bg, icon.key, icon.text);
            iconGroup.setSize(icon.width, icon.height);
            iconGroup.setPosition(icon.position.x, icon.position.y);
            if (!icon.active) {
                iconGroup.setInteractive();
                iconGroup.input.cursor = 'pointer';
                iconGroup.on('pointerdown', icon.functionToCall, this);
            } else {
                var activeIndicator = scene.add.graphics();
                activeIndicator.fillStyle(0xFFFFFF, 1);
                activeIndicator.fillCircle(0, 0, 8);
                iconGroup.add(activeIndicator);
                activeIndicator.setPosition(0, 64);
            }
            group.add(iconGroup);
        } else if (icon.popUp) {
            var iconGroup = createIconButton(scene, icon.bg, icon.key, icon.text);
            iconGroup.setSize(icon.width, icon.height);
            iconGroup.setPosition(icon.position.x, icon.position.y);
            iconGroup.setInteractive();
            iconGroup.input.cursor = 'pointer';
            iconGroup.on('pointerdown', icon.functionToCall, this);
            group.add(iconGroup);
        }

        function createIconButton(scene, bg, key, text) {
            var iconGroup = scene.add.container();
        
            var icon = scene.add.sprite(0, 0, key).setDisplaySize(128, 128).setOrigin(0.5, 0.5);
            
            iconGroup.add(icon);
            return iconGroup;
        
        }

    });

    return group;

}

// MENUBUTTONGROUP
export function createMenuButtonGroup(scene, buttons) {
    var group = scene.add.container();
    var gameScene = scene.scene;
    buttons.forEach(button => {
        var menuButton = scene.add.sprite(0, 0, button.key).setDisplaySize(button.width, button.height).setOrigin(0.5, 0.5);
        menuButton.setPosition(button.position.x, button.position.y);
        if (button.active) {
            menuButton.setInteractive().on('pointerdown', function() {
                gameScene.launch('PopUpScene', {
                    from: gameScene,
                    headline: 'Level ' + button.level,
                    level_id: button.level,
                    buttons: [
                        {
                            key: 'exitButtonBG', from: gameScene,
                            functionToCall: function() {
                                switchScene(this.scene, 'MenuScene');
                            },
                        },
                        {
                            key: 'startAdButtonBG', from: gameScene,
                            functionToCall: function() {
                                gameScene.launch('AdScene', {
                                    callback: () => {
                                        switchScene(this.scene, 'GameScene', button.level, button.timeLimit); 
                                    },
                                });
                                
                            },
                        },
                        {
                            key: 'startEnergyButtonBG', from: gameScene,
                            functionToCall: function() {
                                if (gameScene.scene.registry.get('gameStatsEnergyValue').energy > 0) {
                                    const energyInstance = this.scene.gameScene.scene.registry.get('gameStatsEnergyValue');
                                    energyInstance.loseEnergy(1);
                                    switchScene(this.scene, 'GameScene', this.scene.level, button.timeLimit);
                                } else {
                                    showToast(scene, 'Achtung!', 'Du hast keine Energie mehr.');
                                }
                            },
                        },
                    ]
                });
            }).input.cursor = 'pointer';
        }
        group.add(menuButton);
    });

    group.setPosition(scene.scale.baseSize.width / 2, scene.scale.baseSize.height / 2 - 64);

    return group;
}

// SHOPBUTTONGROUP
export function createShopGroup(scene, buttons, position ) {
    var group = scene.add.container();
    var groupWidth = calculateShopGroupWidth(buttons);
    buttons.forEach(button => {
        var shopButton = createShopButton(scene, button.key, 0, 0, button.width, button.height);
        shopButton.setInteractive().on('pointerdown', () => buyItem(button.buyData)).input.cursor = 'pointer';
        group.add(shopButton);
    });
    if (position === 'left') {
        group.setPosition(
            (scene.scale.baseSize.width / 2) - (groupWidth / 2) - 64, 
            (scene.scale.baseSize.height / 2) + 64
        );
    } else if (position === 'right') {
        group.setPosition(
            (scene.scale.baseSize.width / 2) + (groupWidth / 2) + 64, 
            (scene.scale.baseSize.height / 2) + 64
        );
    }
    group.getAt(0).setPosition(-(group.getAt(0).width), 0);
    group.getAt(2).setPosition(group.getAt(2).width, 0);

    function createShopButton(scene, key, x, y, width, height) {
        return scene.add.sprite(x, y, key).setDisplaySize(width, height).setOrigin(0.5, 0.5);
    }
    function calculateShopGroupWidth(buttons) {
        var totalWidth = 0;
        buttons.forEach(button => {
            totalWidth += button.width;
        });
        return totalWidth;
    }

    function buyItem(buyData) {

        var gold = buyData.scene.registry.get('gameStatsGoldValue');
        var gems = buyData.scene.registry.get('gameStatsGemsValue');
        var energy = buyData.scene.registry.get('gameStatsEnergyValue');

        buyData.scene.scene.launch('PopUpScene', {
            from: scene,
            headline: buyData.quantity + ' ' + buyData.itemType + ' für ' + buyData.price + ' ' + buyData.currency + ' kaufen?',
            buttons: [
                {
                    key: 'cancelButtonBG',
                    from: buyData.scene,
                    functionToCall: function() {
                        buyData.scene.scene.stop(this.scene);
                    },
                },
                {
                    key: 'buyButtonBG',
                    from: buyData.scene,
                    functionToCall: function() {
                        if (buyData.currency === 'Ad') {
                            if (buyData.itemType === 'Gem') {
                                buyData.scene.scene.launch('AdScene', {
                                    callback: () => {
                                        gems.gainGems(buyData.quantity);
                                        showToast(scene, 'Erfolg!', 'Du hast eine Ad gesehen und dafür ' + buyData.quantity + ' ' + buyData.itemType + ' erhalten.');
                                    },
                                });
                            } else if (buyData.itemType === 'Energy') {
                                if (energy.energy + buyData.quantity <= 5) {
                                    buyData.scene.scene.launch('AdScene', {
                                        callback: () => {
                                            energy.gainEnergy(buyData.quantity);
                                            showToast(scene, 'Erfolg!', 'Du hast eine Ad gesehen und dafür ' + buyData.quantity + ' ' + buyData.itemType + ' erhalten.');
                                        },
                                    });
                                } else {
                                    showToast(scene, 'Achtung!', 'Du kannst nicht mehr als 5 Energie haben.');
                                }
                            } else if (buyData.itemType === 'Gold') {
                                buyData.scene.scene.launch('AdScene', {
                                    callback: () => {
                                        gold.gainGold(buyData.quantity);
                                        showToast(scene, 'Erfolg!', 'Du hast eine Ad gesehen und dafür ' + buyData.quantity + ' ' + buyData.itemType + ' erhalten.');
                                    },
                                });
                            } else {
                                showToast(scene, 'Achtung!', 'Aktuell können keine Items gekauft werden.');
                            }
                        } else if (buyData.currency === 'Gold' ) {
                
                            if (buyData.itemType === 'Gem' && gold.gold >= buyData.price) {
                                gold.loseGold(buyData.price);
                                gems.gainGems(buyData.quantity);
                                showToast(scene, 'Erfolg!', 'Du hast ' + buyData.quantity + ' ' + buyData.itemType + ' für ' + buyData.price + ' ' + buyData.currency + ' gekauft.');
                            } else if (buyData.itemType === 'Energy' && gold.gold >= buyData.price) {
                                if (energy.energy + buyData.quantity <= 5) {
                                    gold.loseGold(buyData.price);
                                    energy.gainEnergy(buyData.quantity);
                                    showToast(scene, 'Erfolg!', 'Du hast eine Ad gesehen und dafür ' + buyData.quantity + ' ' + buyData.itemType + ' erhalten.');
                                } else {
                                    showToast(scene, 'Achtung!', 'Du kannst nicht mehr als 5 Energie haben.');
                                }
                            } else {
                                showToast(scene, 'Achtung!', 'Du hast nicht genug ' + buyData.currency + '.');
                            }
                    
                        } else if (buyData.currency === 'Gem') {
                            if (buyData.itemType === 'Energy' && gems.gems >= buyData.price) {
                                if (energy.energy + buyData.quantity <= 5) {
                                    gems.loseGems(buyData.price);
                                    energy.gainEnergy(buyData.quantity);
                                    showToast(scene, 'Erfolg!', 'Du hast ' + buyData.quantity + ' ' + buyData.itemType + ' für ' + buyData.price + ' ' + buyData.currency + ' gekauft.');
                                } else {
                                    showToast(scene, 'Achtung!', 'Du kannst nicht mehr als 5 Energie haben.');
                                }
                            } else if (buyData.itemType === 'Gold' && gems.gems >= buyData.price) {
                                gems.loseGems(buyData.price);
                                gold.gainGold(buyData.quantity);
                                showToast(scene, 'Erfolg!', 'Du hast ' + buyData.quantity + ' ' + buyData.itemType + ' für ' + buyData.price + ' ' + buyData.currency + ' gekauft.');
                            } else {
                                showToast(scene, 'Achtung!', 'Du hast nicht genug ' + buyData.currency + '.');
                            }
                        } else {
                            showToast(scene, 'Achtung!', 'Aktuell können keine Items gekauft werden.');
                        }
                    },
                }
            ],
        });
    }

    return group;
}


