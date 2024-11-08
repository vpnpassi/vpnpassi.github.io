import { createMenuButtonGroup } from '../utilitys/ui.js';
import { preloadBackground, createBackground } from '../utilitys/utils.js';

class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        preloadBackground(this);
        this.load.image('level1', 'assets/images/LVL-1.png');
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
            'Levelauswahl'
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

        var levelButtonWidth = 512 + 32;
        var levelButtonHeight = 192 + 32;	

        this.levelGroup = createMenuButtonGroup(this, [
            { 
                key: 'level1', level: 1, timeLimit: 100, width: levelButtonWidth, height: levelButtonHeight, position: { x: - levelButtonWidth - 64, y: -32 }, active: true,
            },
            { 
                key: 'level2', level: 2, timeLimit: 100, width: levelButtonWidth, height: levelButtonHeight, position: { x: 0, y: -32 }, active: true,
            },
            { 
                key: 'level3', level: 3, timeLimit: 100, width: levelButtonWidth, height: levelButtonHeight, position: { x: levelButtonWidth + 64, y: -32 }, active: true,
            },
            { 
                key: 'level4', level: 4, timeLimit: 100, width: levelButtonWidth, height: levelButtonHeight, position: { x: - levelButtonWidth - 64, y: levelButtonHeight + 32 }, active: true,
            },
            { 
                key: 'level5', width: levelButtonWidth, height: levelButtonHeight, position: { x: 0, y: levelButtonHeight + 32 }, active: false,
            },
            { 
                key: 'level6', width: levelButtonWidth, height: levelButtonHeight, position: { x: levelButtonWidth + 64, y: levelButtonHeight + 32 }, active: false,
            },                                                            
        ]);

    }

}

export { MenuScene };