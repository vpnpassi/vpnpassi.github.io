import { preloadBackground, createBackground } from "../module/bgImage.js";

class SettingsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SettingsScene' });
    }

    preload() {
        preloadBackground(this);
    }

    create() {
        createBackground(this);
        this.scene.launch('GUIScene', {active: true, from: 'SettingsScene'});
    }
}

export { SettingsScene };