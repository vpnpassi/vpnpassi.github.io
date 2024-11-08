import { createGUIIconGroup } from '../utilitys/ui.js';

class PopUpScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PopUpScene' });
        this.gameScene = "";
        this.headline = "";
        this.level = 0;
        this.sourceButtons = [];
    }

    init(data) {
        this.gameScene = data.from;
        this.headline = data.headline;
        this.level = data.level_id;
        this.sourceButtons = data.buttons;
    }

    preload() {
        this.load.image('exitButtonBG', 'assets/sprites/Exit_Button.png');
        this.load.image('redoAdButtonBG', 'assets/sprites/Redo_Ad_Button.png');
        this.load.image('startAdButtonBG', 'assets/sprites/Start_Ad_Button.png');
        this.load.image('startEnergyButtonBG', 'assets/sprites/Start_Energy_Button.png');
        this.load.image('nextButtonBG', 'assets/sprites/Next_Button.png');
        this.load.image('redoGoldButtonBG', 'assets/sprites/Redo_Gold_Button.png');
        this.load.image('cancelButtonBG', 'assets/sprites/Cancel_Button.png');
        this.load.image('buyButtonBG', 'assets/sprites/Buy_Button.png');
    }

    positionIcons(icons) {
        const iconSize = 128;
        const spacing = 64;
        const totalIcons = icons.length;
        const isEven = totalIcons % 2 === 0;
        const centerX = this.scale.baseSize.width / 2;
        const centerY = this.scale.baseSize.height / 2;
    
        icons.forEach((icon, index) => {
            let xOffset;
            if (isEven) {
                xOffset = (index - totalIcons / 2 + 0.5) * (iconSize + spacing);
            } else {
                xOffset = (index - Math.floor(totalIcons / 2)) * (iconSize + spacing);
            }
            icon.position.x = centerX + xOffset;
            icon.position.y = centerY;
        });
    
        return icons;
    }

    create() {

        this.headline = this.headline;

        this.add.rectangle(
            0,
            0,
            1920,
            1080,
            0x000000,
            0.90
        ).setOrigin(0, 0);

        var popUp_headline = this.add.text(
            0, 
            0, 
            this.headline
        ).setStyle({
            fontFamily: 'Fredoka',
            fontSize: '64px', 
            fontStyle: 'bold',
            color: '#ffffff',
        }).setOrigin(
            0.5, 
            0.5
        );

        popUp_headline.setPosition(
            this.scale.baseSize.width / 2,
            160 + 96
        );

        var iconSize = 128;

        const icons = this.sourceButtons.map(button => ({
            key: button.key,
            position: { x: 0, y: 0 },
            width: iconSize,
            height: iconSize,
            functionToCall: button.functionToCall, 
            from: button.from,
            popUp: true
        }));

        const positionedIcons = this.positionIcons(icons);
        this.guiMenuIconGroup = createGUIIconGroup(this, positionedIcons);

    }

}

export { PopUpScene };