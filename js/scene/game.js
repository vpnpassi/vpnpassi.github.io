import { addPlayer, addElement, movePlayer, pushBox, collectCoin } from '../utilitys/utils.js';

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    
    init(data) {
        this.level = data.level || 1;        
    }

    preload() {
        this.load.tilemapTiledJSON('map', `assets/map/level${this.level}/Level${this.level}.tmj`);
        this.load.image('tiles', 'assets/map/tileset-64x64.png');
    }

    create(data) {
        this.level = data.level || 1;
        this.gridSize = 64;

        // MAP
        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage('tileset-64x64', 'tiles');

        // GAMELAYER
        this.groundLayer = map.createLayer('Ground', tileset, 0, 0);
        
        // KOLLISIONLAYER
        this.collisionLayer = map.createLayer('Collision', tileset, 0, 0);
        this.collisionLayer.setCollisionByProperty({ collides: true });

        // OBJECTS LAYER
        const objectsLayer = map.getObjectLayer('Objects');

        // ZIELE
        this.goalGroup = this.physics.add.group();
        this.goals = addElement(this, objectsLayer, 'goal', this.goalGroup, 'tileset', 13, null, this.gridSize);

        // GOLD
        this.goldGroup = this.physics.add.group();
        this.gold = addElement(this, objectsLayer, 'gold', this.goldGroup, 'goldSprite', null, 'gold-flip', this.gridSize);

        // BOXES
        this.boxGroup = this.physics.add.group();
        this.boxes = addElement(this, objectsLayer, 'box', this.boxGroup, 'tileset', 20, null, this.gridSize);

        // PLAYER
        this.player = addPlayer(this, objectsLayer, 'player_spawn', 'playerSprite', 'idle-down', this.gridSize);

        // COLLISION
        this.physics.add.collider(this.player, this.collisionLayer);
        this.physics.add.collider(this.boxGroup, this.collisionLayer);
        this.physics.add.collider(this.boxGroup, this.boxGroup);
        this.physics.add.collider(this.player, this.goldGroup, null, null, this);
        this.physics.add.collider(this.player, this.boxGroup, (player, box) => pushBox(player, box, this), null, this);
        this.physics.add.overlap(this.player, this.goldGroup, (player, coin) => collectCoin(player, coin, this), null, this);

        // INPUTS
        this.cursors = this.input.keyboard.createCursorKeys();

        // CAMERA
        this.cameras.main.startFollow(this.player);
        switch (this.level) {
            case ("1" || "2"):
                this.cameras.main.setBackgroundColor('#3788EE');
                break;
            case ("3" || "4"):
                this.cameras.main.setBackgroundColor('#FDA92A');
                break;
            default:
                this.cameras.main.setBackgroundColor('#77B3FF');
                break;
        }

        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.cache.tilemap.remove('map');
        });

        this.isMoving = false;

    }

    update() {
        

        if (this.isMoving) return;

        if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
            movePlayer(this, -this.gridSize, 0);
            if (!this.player.anims.currentAnim || this.player.anims.currentAnim.key !== 'walk-side') {
                this.player.anims.play('walk-side', true);
            }
            this.player.flipX = true;
            this.lastDirection = 'walk-side';
            this.moving = true;
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
            movePlayer(this, this.gridSize, 0);
            if (!this.player.anims.currentAnim || this.player.anims.currentAnim.key !== 'walk-side') {
                this.player.anims.play('walk-side', true);
            }
            this.player.flipX = false;
            this.lastDirection = 'walk-side';
            this.moving = true;
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            movePlayer(this, 0, -this.gridSize);
            if (!this.player.anims.currentAnim || this.player.anims.currentAnim.key !== 'walk-back') {
                this.player.anims.play('walk-back', true);
            }
            this.lastDirection = 'walk-back';
            this.moving = true;
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
            movePlayer(this, 0, this.gridSize);
            if (!this.player.anims.currentAnim || this.player.anims.currentAnim.key !== 'walk-down') {
                this.player.anims.play('walk-down', true);
            }
            this.lastDirection = 'walk-down';
            this.moving = true;
        } else {
            this.moving = false;
        }

        if (!this.isMoving) {

            if (this.lastDirection === 'walk-side') {
                this.player.anims.play('idle-side', true);
            } else if (this.lastDirection === 'walk-back') {
                this.player.anims.play('idle-back', true);
            } else if (this.lastDirection === 'walk-down') {
                this.player.anims.play('idle-down', true);
            }
        }

    }
}

export { GameScene };