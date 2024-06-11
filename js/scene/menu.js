import { switchScene, preloadBackground, createBackground } from '../utilitys/utils.js';

class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        preloadBackground(this);
        this.load.image('level1', 'assets/images/LVL.png');
        this.load.image('level2', 'assets/images/LVL-2.png');
        this.load.image('level3', 'assets/images/LVL-3.png');
        this.load.image('level4', 'assets/images/LVL-4.png');
        this.load.image('level5', 'assets/images/LVL-5.png');
        this.load.image('level6', 'assets/images/LVL-6.png');
    }

    create() {
        createBackground(this);
        this.scene.launch('GUIScene', {
            active: true, 
            from: 'MenuScene',
        });

        var menu_headline_text = this.add.text(
            0, 
            0, 
            'Level'
        ).setStyle({
            fontFamily: 'Fredoka',
            fontSize: '64px', 
            fontStyle: 'bold',
            color: '#ffffff',
        }).setOrigin(
            0.5, 
            0.5
        );

        menu_headline_text.setPosition(
            this.scale.baseSize.width / 2,
            160 + 96
        );

        var levelGroup = this.add.container();
        var level1 = this.add.sprite(
            0,
            0,
            'level1'
        ).setDisplaySize(
            512,
            192
        ).setOrigin(0.5, 0.5);
        var level2 = this.add.sprite(
            0,
            0,
            'level2'
        ).setDisplaySize(
            512,
            192
        ).setOrigin(0.5, 0.5);
        var level3 = this.add.sprite(
            0,
            0,
            'level3'
        ).setDisplaySize(
            512,
            192
        ).setOrigin(0.5, 0.5);
        var level4 = this.add.sprite(
            0,
            0,
            'level4'
        ).setDisplaySize(
            512,
            192
        ).setOrigin(0.5, 0.5);
        var level5 = this.add.sprite(
            0,
            0,
            'level5'
        ).setDisplaySize(
            512,
            192
        ).setOrigin(0.5, 0.5);
        var level6 = this.add.sprite(
            0,
            0,
            'level6'
        ).setDisplaySize(
            512,
            192
        ).setOrigin(0.5, 0.5);

        levelGroup.add(level1);
        levelGroup.add(level2);
        levelGroup.add(level3);
        levelGroup.add(level4);
        levelGroup.add(level5);
        levelGroup.add(level6);

        levelGroup.width = 1664;
        levelGroup.height = 448;

        levelGroup.setPosition(
            this.scale.baseSize.width / 2,
            this.scale.baseSize.height / 2 - 64,
        );

        level1.setPosition(- level1.width - 64, -32).setInteractive();
        level1.input.cursor = 'pointer';
        level2.setPosition(0, -32).setInteractive();
        level2.input.cursor = 'pointer';
        level3.setPosition(level3.width + 64, -32).setInteractive();
        level3.input.cursor = 'pointer';
        level4.setPosition(- level4.width - 64, level4.height + 32).setInteractive();
        level4.input.cursor = 'pointer';
        level5.setPosition(0, level5.height + 32);
        level6.setPosition(level6.width + 64, level6.height + 32);

        level1.on(
            'pointerdown', function() {
                switchScene(this, 'GameScene', '1', 'MenuScene', 'GUIScene');
            }, this
        );

        level2.on(
            'pointerdown', function() {
                switchScene(this, 'GameScene', '2', 'MenuScene', 'GUIScene');
            }, this
        );

        level3.on(
            'pointerdown', function() {
                switchScene(this, 'GameScene', '3', 'MenuScene', 'GUIScene');
            }, this
        );

        level4.on(
            'pointerdown', function() {
                switchScene(this, 'GameScene', '4', 'MenuScene', 'GUIScene');
            }, this
        );


    }

}

export { MenuScene };