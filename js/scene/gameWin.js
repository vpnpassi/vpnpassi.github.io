import { preloadBackground, createBackground } from '../utilitys/utils.js';

class GameWinScreen extends Phaser.Scene {
    constructor() {
        super({ key: 'GameWinScreen' });
    }

    preload() {
        preloadBackground(this);
    }

    create() {
        createBackground(this);
    }

}

export { GameWinScreen };