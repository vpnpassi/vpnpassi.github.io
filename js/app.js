import { InitScreen } from './scene/init.js';
import { GUIScene } from './scene/gui.js';
import { GameOverScene } from './scene/gameOver.js';
import { GameScene } from './scene/game.js';
import { ShopScene } from './scene/shop.js';
import { MenuScene } from './scene/menu.js';

var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    parent: 'gameCanvas',
    scene: [
        InitScreen,
        MenuScene,
        ShopScene,
        GameScene,
        GUIScene,
        GameOverScene
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

var game = new Phaser.Game(config);