import { preloadBackground, createBackground } from "../module/bgImage.js";

class ShopScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ShopScene' });
    }

    preload() {   
        preloadBackground(this);    
    }

    create() {
        createBackground(this);
        this.scene.launch('GUIScene', {active: true, from: 'ShopScene'});
    }
}

export { ShopScene };