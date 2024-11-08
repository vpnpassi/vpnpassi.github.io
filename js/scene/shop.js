import { createShopGroup } from '../utilitys/ui.js';
import { createBackground, preloadBackground } from '../utilitys/utils.js';

class ShopScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ShopScene' });
    }

    init(data) {
        this.gameStatsData = data;
    }

    preload() {
        preloadBackground(this);
        this.load.image('gem1', 'assets/images/Small_Gem.png');
        this.load.image('gem2', 'assets/images/Medium_Gem.png');
        this.load.image('gem3', 'assets/images/Large_Gem.png');
        this.load.image('energy1', 'assets/images/Small_Energy.png');
        this.load.image('energy2', 'assets/images/Medium_Energy.png');
        this.load.image('energy3', 'assets/images/Large_Energy.png');
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

        this.gemGroup = createShopGroup(this, [
            { key: 'gem1', width: 232, height: 332, buyData: { scene: this, itemType: 'Gem', currency: 'Ad', quantity: 1, price: 1 } },
            { key: 'gem2', width: 232, height: 332, buyData: { scene: this, itemType: 'Gem', currency: 'Gold', quantity: 2, price: 250 } },
            { key: 'gem3', width: 232, height: 332, buyData: { scene: this, itemType: 'Gem', currency: 'Gold', quantity: 5, price: 500 } }
        ], 'left');

        this.energyGroup = createShopGroup(this, [
            { key: 'energy1', width: 232, height: 332, buyData: { scene: this, itemType: 'Energy', currency: 'Ad', quantity: 1, price: 1 } },
            { key: 'energy2', width: 232, height: 332, buyData: { scene: this, itemType: 'Energy', currency: 'Gold', quantity: 2, price: 100 } },
            { key: 'energy3', width: 232, height: 332, buyData: { scene: this, itemType: 'Energy', currency: 'Gem', quantity: 5, price: 5 } }
        ], 'right');

    }

}

export { ShopScene };