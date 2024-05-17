import { preloadBackground, createBackground } from "../module/bgImage.js";

class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        preloadBackground(this);
    }

    create() {
        createBackground(this);
        this.scene.launch('GUIScene', {
            active: true, 
            from: 'MenuScene',
        });
    }

}

export { MenuScene };