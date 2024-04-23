import { preloadBackground, createBackground } from "../module/bgImage.js";

class MapScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MapScene' });
    }

    preload() {
        preloadBackground(this);
    }

    create() {
        createBackground(this);
        this.scene.launch('GUIScene', {active: true, from: 'MapScene'});
    }
}

export { MapScene };