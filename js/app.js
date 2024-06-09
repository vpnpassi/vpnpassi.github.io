import { InitScreen } from './scene/init.js';
import { GUIScene } from './scene/gui.js';
import { GameOverScene } from './scene/gameOver.js';
import { GameWinScreen } from './scene/gameWin.js';
import { ShopScene } from './scene/shop.js';
import { MenuScene } from './scene/menu.js';
import { GameScene } from './scene/game.js';

var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1024,
    parent: 'gameCanvas',
    scene: [
        InitScreen,
        MenuScene,
        ShopScene,
        GameScene,
        GUIScene,
        GameOverScene,
        GameWinScreen
    ],
    fps: {
        target: 60
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

var game = new Phaser.Game(config);