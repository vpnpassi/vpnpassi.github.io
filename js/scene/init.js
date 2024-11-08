import { Energy } from '../classes/energy.js';
import { Gold } from '../classes/gold.js';
import { Gems } from '../classes/gem.js';
import { addAnimation, preloadBackground, createBackground, switchScene } from '../utilitys/utils.js';

class InitScreen extends Phaser.Scene {
    constructor() {
        super({ key: 'InitScreen' });
    }

    init() {

        if (!this.registry.has('gameStatsEnergyValue')) {
            this.registry.set('gameStatsEnergyValue', new Energy(5, this));
        }
        if (!this.registry.has('gameStatsGoldValue')) {
            this.registry.set('gameStatsGoldValue', new Gold(0, this));
        }
        if (!this.registry.has('gameStatsGemsValue')) {
            this.registry.set('gameStatsGemsValue', new Gems(0, this));
        }  
        
        this.registry.set('uncoveredGoals', 0);
    }

    preload() {
        preloadBackground(this);
        this.load.image('startGame_button_icon', 'assets/icons/icon_ui-arrow-right_LP.png');
        this.load.atlas('playerSprite', 'assets/sprites/character-animation.png', 'assets/sprites/character-animation.json');
        this.load.atlas('goldSprite', 'assets/sprites/gold-animation.png', 'assets/sprites/gold-animation.json');
        this.load.spritesheet('tileset', 'assets/map/tileset-64x64.png', {
            frameWidth: 64,
            frameHeight: 64
        });
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
                switchScene(this, 'MenuScene');
            }, this
        );

        addAnimation(this, 'idle-down', 'playerSprite', 1, 2, 'idle-down-', '.png', -1, 4);
        addAnimation(this, 'idle-side', 'playerSprite', 1, 2, 'idle-side-', '.png', -1, 4);
        addAnimation(this, 'idle-back', 'playerSprite', 1, 2, 'idle-back-', '.png', -1, 4);
        addAnimation(this, 'walk-down', 'playerSprite', 1, 4, 'walk-down-', '.png', -1, 4);
        addAnimation(this, 'walk-side', 'playerSprite', 1, 4, 'walk-side-', '.png', -1, 4);
        addAnimation(this, 'walk-back', 'playerSprite', 1, 4, 'walk-back-', '.png', -1, 4);
        addAnimation(this, 'hit-down', 'playerSprite', 1, 2, 'hit-down-', '.png', -1, 4);
        addAnimation(this, 'hit-side', 'playerSprite', 1, 2, 'hit-side-', '.png', -1, 4);
        addAnimation(this, 'hit-back', 'playerSprite', 1, 2, 'hit-back-', '.png', -1, 4);
        addAnimation(this, 'death-down', 'playerSprite', 1, 3, 'death-down-', '.png', -1, 6);
        addAnimation(this, 'death-side', 'playerSprite', 1, 3, 'death-side-', '.png', -1, 6);
        addAnimation(this, 'death-back', 'playerSprite', 1, 3, 'death-back-', '.png', -1, 6);

        addAnimation(this, 'gold-flip', 'goldSprite', 1, 16, 'Gold-', '.png', -1, 16);

    }
}

export { InitScreen };