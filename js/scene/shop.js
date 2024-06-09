import { preloadBackground, createBackground } from '../utilitys/utils.js';

class ShopScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ShopScene' });
    }

    init(data) {
        this.gameStatsData = data;
    }

    preload() {
        preloadBackground(this);
    }

    create() {
        createBackground(this);
        this.scene.launch('GUIScene', {
            active: true, 
            from: 'ShopScene',
        });

        var shop_headline_text = this.add.text(
            0, 
            0, 
            'Shop'
        ).setStyle({
            fontFamily: 'Fredoka',
            fontSize: '64px', 
            fontStyle: 'bold',
            color: '#ffffff',
        }).setOrigin(
            0.5, 
            0.5
        );

        shop_headline_text.setPosition(
            this.scale.baseSize.width / 2,
            160 + 96
        );

    }
}

export { ShopScene };