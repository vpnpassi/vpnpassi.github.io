import { InitScreen } from './scene/init.js';
import { GUIScene } from './scene/gui.js';
import { GameScene } from './scene/game.js';
import { SettingsScene } from './scene/settings.js';
import { ShopScene } from './scene/shop.js';
import { MapScene } from './scene/map.js';

var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    parent: 'gameCanvas',
    scene: [
        //InitScreen,
        MapScene,
        SettingsScene, 
        ShopScene,
        GameScene,
        GUIScene
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

var game = new Phaser.Game(config);