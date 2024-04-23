import { Energy } from '../methods/energy.js';

var energy = new Energy();

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.audio('game_music', ['assets/sound/game.mp3']);
    }

    create() {
        var game_music = this.sound.add('menu_music', {volume: 0.025});
    }

    update() {
    }
}

export { GameScene };