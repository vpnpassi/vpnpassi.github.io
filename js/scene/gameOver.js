import { preloadBackground, createBackground } from "../module/bgImage.js";

class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    preload() {
        preloadBackground(this);
    }

    create() {
        createBackground(this);
    }

}

export { GameOverScene };