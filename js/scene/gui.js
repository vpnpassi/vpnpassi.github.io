import { createStatsGroup, createGUIIconGroup } from "../utilitys/ui.js";
import { Energy } from '../classes/energy.js';
import { Gold } from '../classes/gold.js';
import { Gems } from '../classes/gem.js';
import { updateSceneActiveStatus, getSceneActiveStatus, showToast, switchScene } from "../utilitys/utils.js";

class GUIScene extends Phaser.Scene {
    constructor() {
        super({ 
            key: 'GUIScene', 
            active: false
        });
        this.levelHeadline = "";
        this.goalTextLabelText = "Offene Ziele";
        this.goalTextRemainingText = "X";
        this.timeLimitLabelText = "Verbleibend";
        this.timeLimitRemainingText = "X";

        this.activeScenes = [
            { key: 'gameStatsActive', value: true },
            { key: 'shopSceneActive', value: false },
            { key: 'menuSceneActive', value: false },
            { key: 'gameSceneActive', value: false },
            { key: 'gameScene', value: '' }
        ];

        this.gameStatsTextObjects = [];
    }

    init(data) {
        if (data.from === 'GameScene') {

            this.data = data;
            this.levelHeadline = `Level ${data.level}`;

            updateSceneActiveStatus.call(this, this.activeScenes, 'shopSceneActive', false);
            updateSceneActiveStatus.call(this, this.activeScenes, 'menuSceneActive', false);
            updateSceneActiveStatus.call(this, this.activeScenes, 'gameSceneActive', true);
            updateSceneActiveStatus.call(this, this.activeScenes, 'gameScene', data.from);

            this.timeLimitRemainingText = data.timeLimit;

        }
        if (data.from === 'ShopScene') {

            this.levelHeadline = "";

            updateSceneActiveStatus.call(this, this.activeScenes, 'shopSceneActive', true);
            updateSceneActiveStatus.call(this, this.activeScenes, 'menuSceneActive', false);
            updateSceneActiveStatus.call(this, this.activeScenes, 'gameSceneActive', false);
            updateSceneActiveStatus.call(this, this.activeScenes, 'gameScene', "");
            
        }
        if (data.from === 'MenuScene') {

            this.levelHeadline = "";

            updateSceneActiveStatus.call(this, this.activeScenes, 'shopSceneActive', false);
            updateSceneActiveStatus.call(this, this.activeScenes, 'menuSceneActive', true);
            updateSceneActiveStatus.call(this, this.activeScenes, 'gameSceneActive', false);
            updateSceneActiveStatus.call(this, this.activeScenes, 'gameScene', "");
            
        }

    }

    preload() {
        this.load.image('shopButtonBG', 'assets/sprites/Shop_Button.png');
        this.load.image('menuButtonBG', 'assets/sprites/Menu_Button.png');
        this.load.image('exitButtonBG', 'assets/sprites/Exit_Button.png');
        this.load.image('redoAdButtonBG', 'assets/sprites/Redo_Ad_Button.png');
        this.load.image('redoGoldButtonBG', 'assets/sprites/Redo_Gold_Button.png');
        this.load.image('resetButtonBG', 'assets/sprites/Reset_Button.png');

        this.load.image('energyBarLeft', 'assets/sprites/Energybar_left.png');
        this.load.image('energyBarRight', 'assets/sprites/EnergyGembar_right.png');
        this.load.image('goldBarLeft', 'assets/sprites/Goldbar_left.png');
        this.load.image('goldBarRight', 'assets/sprites/Goldbar_right.png');
        this.load.image('gemBarLeft', 'assets/sprites/Gembar_left.png');
        this.load.image('gemBarRight', 'assets/sprites/EnergyGembar_right.png');
        this.load.image('statBarMiddle', 'assets/sprites/Middle.png');
        this.load.image('energy', 'assets/icons/icon_rune.png');
        this.load.image('gem', 'assets/icons/icon_gem_red.png');
        this.load.image('gold', 'assets/icons/icon_gold.png');
    }

    create() {

        var guiGroup = this.add.container();
        var guiFooter = this.add.container();
        guiGroup.add(guiFooter);

        // Level Headline
        this.levelHeadline = this.add.text(
            0,
            0,
            this.levelHeadline
        ).setStyle({
            fontFamily: 'Fredoka',
            fontSize: '48px', 
            fontStyle: 'bold',
            color: '#ffffff',
        }).setOrigin(
            0, 
            0
        ).setPosition(
            96, 64
        );

        const energyValue = this.registry.get('gameStatsEnergyValue').energy;
        const goldValue = this.registry.get('gameStatsGoldValue').gold;
        const gemsValue = this.registry.get('gameStatsGemsValue').gems;

        this.gameStatsGroup = createStatsGroup(this, [
            { 
                key: 'energy', addButton: true, value: energyValue, position: 'left', buttonIconGroup: [
                { icon: { key: 'energyBarLeft', x: 0, y: 0, width: 64, height: 64 } }, 
                { icon: { key: 'statBarMiddle', x: 0, y: 0, width: 64, height: 64 } }, 
                { icon: { key: 'energyBarRight', x: 0, y: 0, width: 64, height: 64 } }
            ]},
            { 
                key: 'gold', addButton: true, value: goldValue, position: 'center', buttonIconGroup: [
                { icon: { key: 'goldBarLeft', x: 0, y: 0, width: 16, height: 64 } }, 
                { icon: { key: 'statBarMiddle', x: 0, y: 0, width: 64, height: 64 } }, 
                { icon: { key: 'goldBarRight', x: 0, y: 0, width: 64, height: 64 } }
            ]},
            { 
                key: 'gems', addButton: true, value: gemsValue, position: 'right', buttonIconGroup: [
                { icon: { key: 'gemBarLeft', x: 0, y: 0, width: 64, height: 64 } }, 
                { icon: { key: 'statBarMiddle', x: 0, y: 0, width: 64, height: 64 } }, 
                { icon: { key: 'gemBarRight', x: 0, y: 0, width: 64, height: 64 } }
            ]},
        ]);

        this.gameStatsGroup.list.forEach((buttonGroup, index) => {
            const textObject = buttonGroup.textObject;
            if (textObject) {
                this.gameStatsTextObjects[index] = textObject;
            } else {
                showToast(this.scene, 'Achtung', 'Textobjeckt für index ' + index + ' nicht gefunden.');
            }
        });

        this.registry.events.on('changedata-gameStatsEnergyValue', (parent, key, data) => {
            this.updateGameStatsText(this.registry, 'gameStatsEnergyValue', data);
        }, this);
        
        this.registry.events.on('changedata-gameStatsGoldValue', (parent, key, data) => {
            this.updateGameStatsText(this.registry, 'gameStatsGoldValue', data);
        }, this);
        
        this.registry.events.on('changedata-gameStatsGemsValue', (parent, key, data) => {
            this.updateGameStatsText(this.registry, 'gameStatsGemsValue', data);
        }, this);

        

        var shopOrMenuSceneActiveStatus = getSceneActiveStatus.call(this, this.activeScenes, 'shopSceneActive') || getSceneActiveStatus.call(this, this.activeScenes, 'menuSceneActive');
        var shopSceneActiveStatus = getSceneActiveStatus.call(this, this.activeScenes, 'shopSceneActive');
        var menuSceneActiveStatus = getSceneActiveStatus.call(this, this.activeScenes, 'menuSceneActive');
        var gameSceneActiveStatus = getSceneActiveStatus.call(this, this.activeScenes, 'gameSceneActive');

        var iconSize = 128;

        this.guiIconGroup = createGUIIconGroup(this, [
            { 
                bg: 'shopButtonBG', key: 'shopButtonBG', text: '', position: { x: 96, y: this.scale.baseSize.height - 96 }, width: iconSize, height: iconSize,
                functionToCall: function() { 
                    switchScene(this.scene, 'ShopScene');
                }, 
                from: 'GUIScene', activeScene: shopOrMenuSceneActiveStatus, active: shopSceneActiveStatus 
            },
            { 
                bg: 'resetButtonBG', key: 'resetButtonBG', text: '', position: { x: this.scale.baseSize.width / 2, y: this.scale.baseSize.height - 96 }, width: iconSize, height: iconSize,
                functionToCall: this.resetButton, from: 'GUIScene', activeScene: shopOrMenuSceneActiveStatus, active: false 
            },
            { 
                bg: 'menuButtonBG', key: 'menuButtonBG', text: '', position: { x: this.scale.baseSize.width - 96, y: this.scale.baseSize.height - 96 }, width: iconSize, height: iconSize,
                functionToCall: function() { 
                    switchScene(this.scene, 'MenuScene');
                }, 
                from: 'GUIScene', activeScene: shopOrMenuSceneActiveStatus, active: menuSceneActiveStatus 
            },
            {
                bg: 'exitButtonBG', key: 'exitButtonBG', text: '', position: { x: this.scale.baseSize.width - 96, y: 96 }, width: iconSize, height: iconSize,
                functionToCall: function() { 
                    this.scene.scene.start('MenuScene'); 
                    this.scene.levelHeadline = "";
                    this.scene.scene.stop(getSceneActiveStatus.call(this, this.scene.activeScenes, 'gameScene')); 
                    updateSceneActiveStatus.call(this, this.scene.activeScenes, 'gameSceneActive', false); 
                },
                from: 'GUIScene', activeScene: gameSceneActiveStatus,active: false
            }, 
            {
                bg: 'redoAdButtonBG', key: 'redoAdButtonBG', text: '', position: { x: 96, y: this.scale.baseSize.height - 96 }, width: iconSize, height: iconSize,
                functionToCall: function() {

                },
                from: 'GUIScene', activeScene: gameSceneActiveStatus, active: false
            },
            {
                bg: 'redoGoldButtonBG', key: 'redoGoldButtonBG', text: '', position: { x: 96 + 16 + iconSize, y: this.scale.baseSize.height - 96 }, width: iconSize, height: iconSize,
                functionToCall: function() {

                },
                from: 'GUIScene', activeScene: gameSceneActiveStatus, active: false
            }
        ]);

        if (gameSceneActiveStatus == true) {

            this.goalTextLabel = this.add.text(
                0,
                0,
                this.goalTextLabelText
            ).setStyle({
                fontFamily: 'Fredoka',
                fontSize: '24px', 
                fontStyle: 'bold',
                color: '#ffffff',
            }).setOrigin(
                0.5,
                0.5
            );
            this.goalTextLabel.setPosition(
                this.scale.baseSize.width - (this.goalTextLabel.width / 2) - 64, this.scale.baseSize.height - (this.goalTextLabel.height / 2) - 64
            );
            
            this.goalTextRemaining = this.add.text(
                0,
                0,
                this.goalTextRemainingText
            ).setStyle({
                fontFamily: 'Fredoka',
                fontSize: '48px', 
                fontStyle: 'bold',
                color: '#ffffff',
            }).setOrigin(
                0.5,
                0.5
            );
            this.goalTextRemaining.setPosition(
                this.scale.baseSize.width - (this.goalTextRemaining.width / 2) - 64, this.scale.baseSize.height - (this.goalTextRemaining.height / 2) - 64 - this.goalTextLabel.height - 8
            );

            this.timeLimitLabel = this.add.text(
                0,
                0,
                this.timeLimitLabelText
            ).setStyle({
                fontFamily: 'Fredoka',
                fontSize: '24px', 
                fontStyle: 'bold',
                color: '#ffffff',
            }).setOrigin(
                0.5, 
                0.5
            );
            this.timeLimitLabel.setPosition(
                this.scale.baseSize.width - (this.timeLimitLabel.width / 2) - 64, this.scale.baseSize.height - (this.timeLimitLabel.height / 2) - 64 - this.goalTextLabel.height - 8 - this.goalTextRemaining.height - 8
            );

            this.timeLimitRemaining = this.add.text(
                0,
                0,
                this.timeLimitRemainingText
            ).setStyle({
                fontFamily: 'Fredoka',
                fontSize: '48px', 
                fontStyle: 'bold',
                color: '#ffffff',
            }).setOrigin(
                0.5, 
                0.5
            );
            this.timeLimitRemaining.setPosition(
                this.scale.baseSize.width - (this.timeLimitRemaining.width / 2) - 64, this.scale.baseSize.height - (this.timeLimitLabel.height / 2) - 64 - this.goalTextLabel.height - 8 - this.goalTextRemaining.height - 8 - this.timeLimitLabel.height - 8
            );

            this.time.addEvent({
                delay: 1000,
                callback: this.updateTimeLimit,
                callbackScope: this,
                loop: true
            });

            this.registry.events.on('changedata-uncoveredGoals', (parent, key, data) => {
                this.updateGoalText(this.registry, 'uncoveredGoals', data);
            }, this);

            this.updateGoalText('uncoveredGoals', this.registry.get('uncoveredGoals'));
        }

    }

    updateTimeLimit() {
        if (this.timeLimitRemainingText > 0) {
            this.timeLimitRemainingText--;
            this.timeLimitRemaining.setText(this.timeLimitRemainingText);
        } else {
            this.time.removeEvent();
            this.timeLimitRemaining.setText('0');
        }
    }

    updateGoalText(parent, key, data) {
        const uncoveredGoals = data;
        this.goalTextRemaining.setText(uncoveredGoals);
    }

    updateGameStatsText(parent, key, data) {
        const keyMap = {
            'gameStatsEnergyValue': 'energy',
            'gameStatsGoldValue': 'gold',
            'gameStatsGemsValue': 'gems'
        };
        const mappedKey = keyMap[key];
        if (!mappedKey) {
            showToast(this.scene, 'Achtung', 'Mapped Key für Registry Key ' + key + ' nicht gefunden.');
            return;
        }
        const indexMap = { 'energy': 0, 'gold': 1, 'gems': 2 };
        const index = indexMap[mappedKey];
        if (this.gameStatsTextObjects[index]) {
            const value = data[mappedKey];
            this.gameStatsTextObjects[index].setText(String(value));
        } else {
            showToast(this.scene, 'Achtung', 'Textobjekt für: ' + mappedKey + ' nicht gefunden.');
        }
    }

    resetButton() {

        this.scene.registry.set('gameStatsEnergyValue', new Energy(5, this.scene).saveEnergy(5));
        this.scene.registry.set('gameStatsGoldValue', new Gold(0, this.scene).saveGold(0));
        this.scene.registry.set('gameStatsGemsValue', new Gems(0, this.scene).saveGems(0));

        this.scene.updateGameStatsText(this.scene.registry, 'gameStatsEnergyValue', { energy: 5 });
        this.scene.updateGameStatsText(this.scene.registry, 'gameStatsGoldValue', { gold: 0 });
        this.scene.updateGameStatsText(this.scene.registry, 'gameStatsGemsValue', { gems: 0 });

        window.location.reload();

    }

    update() {}
}

export { GUIScene };
