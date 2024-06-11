import { preloadBackground, createBackground } from '../utilitys/utils.js';

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