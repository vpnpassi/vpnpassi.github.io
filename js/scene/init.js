import { preloadBackground, createBackground } from "../module/bgImage.js";
import { Energy } from '../methods/energy.js';
import { Gold } from '../methods/gold.js';
import { Gems } from '../methods/gem.js';

class InitScreen extends Phaser.Scene {
    constructor() {
        super({ key: 'InitScreen' });
    }

    init() {
        this.registry.set('gameStatsEnergyValue', new Energy(5, this));
        this.registry.set('gameStatsGoldValue', new Gold(0));
        this.registry.set('gameStatsGemsValue', new Gems(0));
    }

    preload() {
        preloadBackground(this);
        this.load.image('startGame_button_icon', 'assets/icons/icon_ui-arrow-right_LP.png');
    }

    create() {

        createBackground(this);
        var startGame_button_container = this.add.container();

        var startGame_button_icon = this.add.sprite(
            0, 
            0, 
            'startGame_button_icon'
        ).setDisplaySize(
            64, 
            64
        ).setOrigin(
            0.5, 
            0.5
        );
        startGame_button_container.add(startGame_button_icon);

        var startGame_button_text = this.add.text(
            0, 
            0, 
            'Spiel starten'
        ).setStyle({
            fontFamily: 'Fredoka',
            fontSize: '64px', 
            fontStyle: 'bold',
            color: '#ffffff',
        }).setOrigin(
            0.5, 
            0.5
        );
        startGame_button_icon.setX(
            startGame_button_text.displayWidth / 2
        );
        startGame_button_text.setX(
            -startGame_button_icon.displayWidth / 2
        );
        startGame_button_container.add(startGame_button_text);

        startGame_button_container.setSize(
            startGame_button_icon.displayWidth + startGame_button_text.displayWidth, 
            startGame_button_icon.displayHeight
        ).setPosition(
            this.scale.baseSize.width / 2,
            this.scale.baseSize.height / 2
        );

        startGame_button_container.setInteractive();
        startGame_button_container.input.cursor = 'pointer';

        startGame_button_container.on(
            'pointerdown', function() {
                this.scene.launch('MenuScene');
            }, this
        );
    }
}

export { InitScreen };