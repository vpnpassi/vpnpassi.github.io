class GUIScene extends Phaser.Scene {
    constructor() {
        super({ 
            key: 'GUIScene', 
            active: false
        });
        this.gameStatsActive = false;
        this.shopSceneActive = false;
        this.menuSceneActive = false;
        this.gameSceneActive = false;

    }

    init(data) {
        if (data.from === 'gameSceneActive') {
            this.shopSceneActive = false;
            this.menuSceneActive = false;
            this.gameStatsActive = true;
        }
        if (data.from === 'ShopScene') {
            this.shopSceneActive = true;
            this.menuSceneActive = false;
            this.gameStatsActive = true;
        }
        if (data.from === 'MenuScene') {
            this.shopSceneActive = false;
            this.menuSceneActive = true;
            this.gameStatsActive = true;
        }

        this.gameStatsEnergyValue = this.registry.get('gameStatsEnergyValue');
        this.gameStatsGoldValue = this.registry.get('gameStatsGoldValue');
        this.gameStatsGemsValue = this.registry.get('gameStatsGemsValue');

    }

    preload() {
        this.load.image('shopButtonBG', 'assets/sprites/shop_button.png');
        this.load.image('menuButtonBG', 'assets/sprites/menu_button.png');

        this.load.image('energyBarLeft', 'assets/sprites/EnergyBar_left.png');
        this.load.image('energyBarRight', 'assets/sprites/EnergyBar_right.png');
        this.load.image('goldBarLeft', 'assets/sprites/GoldBar_left.png');
        this.load.image('goldBarRight', 'assets/sprites/GoldBar_right.png');
        this.load.image('gemBarLeft', 'assets/sprites/GemBar_left.png');
        this.load.image('gemBarRight', 'assets/sprites/GemBar_right.png');
        this.load.image('statBarMiddle', 'assets/sprites/Middle.png');
    }

    create() {

        var guiGroup = this.add.container();
        var guiHeader = this.add.container();
        guiGroup.add(guiHeader);
        var guiFooter = this.add.container();
        guiGroup.add(guiFooter);

        /* GameStats */
        var gameStatsGroup = this.add.container();
 
        var gameStatsEnergyGroup = this.add.container();
        var gameStatsEnergyWrapperGroup = this.add.container();

        var energyBarLeft = this.add.sprite(
            0,
            0,
            'energyBarLeft'
        ).setDisplaySize(
            64,
            64
        ).setOrigin(0.5, 0.5);
        gameStatsEnergyGroup.add(energyBarLeft);
        var energyBarMiddle = this.add.sprite(
            0,
            0,
            'statBarMiddle'
        ).setDisplaySize(
            64,
            64
        ).setOrigin(0.5, 0.5);
        gameStatsEnergyGroup.add(energyBarMiddle);
        var energyBarRight = this.add.sprite(
            0,
            0,
            'energyBarRight'
        ).setDisplaySize(
            64,
            64
        ).setOrigin(0.5, 0.5);
        gameStatsEnergyGroup.add(energyBarRight);

        var gameStatsEnergyCurrentText = this.add.text(0, 0, '').setOrigin(0.5, 0.5).setStyle({fontSize: '32px', fontFamily: 'Fredoka', color: '#ffffff', align: 'right', fontStyle: 'bold'});
        
        gameStatsEnergyCurrentText.setText(String(this.gameStatsEnergyValue.energy));
        
        gameStatsEnergyWrapperGroup.add(gameStatsEnergyCurrentText);

        gameStatsEnergyGroup.add(gameStatsEnergyWrapperGroup);
        gameStatsEnergyWrapperGroup.setSize(8 + gameStatsEnergyCurrentText.width + 8, gameStatsEnergyCurrentText.height);

        energyBarMiddle.setDisplaySize(gameStatsEnergyWrapperGroup.width + 16, 64);

        energyBarLeft.setX(- (gameStatsEnergyWrapperGroup.width / 2) - (energyBarLeft.width / 2) + 24);
        energyBarRight.setX((gameStatsEnergyWrapperGroup.width / 2) + (energyBarRight.width / 2) - 24);

        gameStatsEnergyGroup.width = energyBarLeft.width + 8 + gameStatsEnergyCurrentText.width + 8 + energyBarRight.width;

        gameStatsGroup.add(gameStatsEnergyGroup);

        var gameStatsGoldGroup = this.add.container();
        var gameStatsGoldWrapperGroup = this.add.container();

        var goldBarLeft = this.add.sprite(
            0,
            0,
            'goldBarLeft'
        ).setDisplaySize(
            16,
            64
        ).setOrigin(0.5, 0.5);
        gameStatsGroup.add(goldBarLeft);
        var goldBarMiddle = this.add.sprite(
            0,
            0,
            'statBarMiddle'
        ).setDisplaySize(
            64,
            64
        ).setOrigin(0.5, 0.5);
        gameStatsGroup.add(goldBarMiddle);
        var goldBarRight = this.add.sprite(
            0,
            0,
            'goldBarRight'
        ).setDisplaySize(
            64,
            64
        ).setOrigin(0.5, 0.5);
        gameStatsGroup.add(goldBarRight);

        var gameStatsGoldCurrentText = this.add.text(0, 0, '').setOrigin(0.5, 0.5).setStyle({fontSize: '32px', fontFamily: 'Fredoka', color: '#ffffff', align: 'right', fontStyle: 'bold'});
        gameStatsGoldCurrentText.setText(String(this.gameStatsGoldValue.gold));
        gameStatsGoldWrapperGroup.add(gameStatsGoldCurrentText);
        gameStatsGoldWrapperGroup.width = gameStatsGoldCurrentText.width;
        gameStatsGoldGroup.add(gameStatsGoldWrapperGroup);

        goldBarLeft.setX(- (gameStatsGoldWrapperGroup.width / 2) - (goldBarLeft.width / 2) - 24);
        goldBarMiddle.setDisplaySize(8 + gameStatsGoldWrapperGroup.width + 8, 64);
        goldBarMiddle.setX(- 24);
        gameStatsGoldCurrentText.setX(-24);
        goldBarRight.setX((gameStatsGoldWrapperGroup.width / 2) + (goldBarRight.width / 2) - 48);

        gameStatsGoldGroup.width = goldBarLeft.width + gameStatsGoldWrapperGroup.width + goldBarRight.width;
        gameStatsGroup.add(gameStatsGoldGroup);

        var gameStatsGemsGroup = this.add.container();
        var gameStatsGemsWrapperGroup = this.add.container();

        var gemBarLeft = this.add.sprite(
            0,
            0,
            'gemBarLeft'
        ).setDisplaySize(
            64,
            64
        ).setOrigin(0.5, 0.5);
        gameStatsGemsGroup.add(gemBarLeft);
        var gemBarMiddle = this.add.sprite(
            0,
            0,
            'statBarMiddle'
        ).setDisplaySize(
            64,
            64
        ).setOrigin(0.5, 0.5);
        gameStatsGemsGroup.add(gemBarMiddle);
        var gemBarRight = this.add.sprite(
            0,
            0,
            'gemBarRight'
        ).setDisplaySize(
            64,
            64
        ).setOrigin(0.5, 0.5);
        gameStatsGemsGroup.add(gemBarRight);

        var gameStatsGemsCurrentText = this.add.text(0, 0, '').setOrigin(0.5, 0.5).setStyle({fontSize: '32px', fontFamily: 'Fredoka', color: '#ffffff', align: 'right', fontStyle: 'bold'});
        gameStatsGemsCurrentText.setText(String(this.gameStatsGemsValue.gems));
        gameStatsGemsWrapperGroup.add(gameStatsGemsCurrentText);
        gameStatsGemsGroup.width = gameStatsGemsCurrentText.width + 16;
        gameStatsGemsGroup.add(gameStatsGemsWrapperGroup);

        gemBarLeft.setX(- (gameStatsGemsGroup.width / 2) - (gemBarLeft.width / 2) + 24);
        gemBarMiddle.setDisplaySize(8 + gameStatsGemsGroup.width + 8, 64);
        gemBarRight.setX((gameStatsGemsGroup.width / 2) + (gemBarRight.width / 2) - 24);

        gameStatsGroup.add(gameStatsGemsGroup);

        if(gameStatsEnergyGroup.displayWidth < gameStatsGoldGroup.displayWidth) {
            gameStatsEnergyGroup.setX(- (gameStatsGoldGroup.displayWidth / 2) - (gameStatsEnergyGroup.displayWidth / 2) -32);
        } else if(gameStatsEnergyGroup.displayWidth > gameStatsGoldGroup.displayWidth) {
            gameStatsEnergyGroup.setX(- (gameStatsEnergyGroup.displayWidth / 2) - (gameStatsGoldGroup.displayWidth / 2) -32);
        } else {
            gameStatsEnergyGroup.setX(- 24 - 16 - 128);
        }

        gameStatsGemsGroup.setX((gameStatsGemsGroup.displayWidth / 2) + (gameStatsGoldGroup.displayWidth / 2) + 24 + 16 + 128);

        gameStatsGroup.setPosition(this.scale.baseSize.width / 2, 96);

        guiHeader.add(gameStatsGroup);
        
        /* SHOPBUTTON */
        var shopButtonGroup = this.add.container();
        shopButtonGroup.setSize(128, 128);
        shopButtonGroup.setInteractive();
        shopButtonGroup.input.cursor = 'pointer';

        var shopButtonBG = this.add.sprite(
            0,
            0,
            'shopButtonBG'
        ).setDisplaySize(
            128,
            128
        ).setOrigin(0.5, 0.5);
        shopButtonBG.width = 128;
        shopButtonBG.height = 128;

        if (this.shopSceneActive == true) {
            shopButtonGroup.removeInteractive();
            var shopButtonActiveCircle = this.add.graphics();
            shopButtonActiveCircle.fillStyle(
                0xFFFFFF, 1
            );
            shopButtonGroup.add(shopButtonActiveCircle);
            shopButtonActiveCircle.fillCircle(0, 0, 8);
            shopButtonActiveCircle.setPosition(0, 64);
        }

        shopButtonGroup.add(shopButtonBG);
        shopButtonGroup.setSize(128, 128);
        shopButtonGroup.setPosition(96, this.scale.baseSize.height - 96);
        guiFooter.add(shopButtonGroup);

        /* menuButton */
        var menuButtonGroup = this.add.container();
        menuButtonGroup.setSize(128, 128);
        menuButtonGroup.setInteractive();
        menuButtonGroup.input.cursor = 'pointer';
        var menuButtonBG = this.add.sprite(
            0,
            0,
            'menuButtonBG'
        ).setDisplaySize(
            128,
            128
        ).setOrigin(0.5, 0.5);
        menuButtonBG.width = 128;
        menuButtonBG.height = 128;

        if (this.menuSceneActive == true) {
            menuButtonGroup.removeInteractive();
            var menuButtonActiveCircle = this.add.graphics();
            menuButtonActiveCircle.fillStyle(
                0xFFFFFF, 1
            );
            menuButtonGroup.add(menuButtonActiveCircle); 
            menuButtonActiveCircle.fillCircle(0, 0, 8);
            menuButtonActiveCircle.setPosition(0, 64);
        }

        menuButtonGroup.add(menuButtonBG);
        menuButtonGroup.setSize(128, 128);
        menuButtonGroup.setPosition(this.scale.baseSize.width - 96, this.scale.baseSize.height - 96);
        guiFooter.add(menuButtonGroup);

        shopButtonGroup.on(
            'pointerdown', function() {
                this.scene.launch('ShopScene');
            }, this
        );
        menuButtonGroup.on(
            'pointerdown', function() {
                this.scene.launch('MenuScene');
            }, this
        );

    }
}

export { GUIScene };