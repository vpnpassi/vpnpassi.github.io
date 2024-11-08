import { InitScreen } from './scene/init.js';
import { GUIScene } from './scene/gui.js';
import { ShopScene } from './scene/shop.js';
import { MenuScene } from './scene/menu.js';
import { GameScene } from './scene/game.js';
import { PopUpScene } from './scene/popUp.js';
import { AdScene } from './scene/ad.js';

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
        PopUpScene,
        AdScene
    ],
    fps: {
        target: 60
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    audio: {
        noAudio: true
    }
};

var game = new Phaser.Game(config);