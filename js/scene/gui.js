class GUIScene extends Phaser.Scene {
    constructor() {
        super({ 
            key: 'GUIScene', 
            active: false
        });
        this.gameStatsActive = false;
        this.settingsSceneActive = false;
        this.shopSceneActive = false;
        this.mapSceneActive = false;
        this.gameSceneActive = false;
    }

    init(data) {
        if (data.from === 'gameSceneActive') {
            this.settingsSceneActive = false;
            this.shopSceneActive = false;
            this.mapSceneActive = false;
            this.gameStatsActive = true;
        }
        if (data.from === 'SettingsScene') {
            this.settingsSceneActive = true;
            this.shopSceneActive = false;
            this.mapSceneActive = false;
            this.gameStatsActive = false;
        }
        if (data.from === 'ShopScene') {
            this.settingsSceneActive = false;
            this.shopSceneActive = true;
            this.mapSceneActive = false;
            this.gameStatsActive = true;
        }
        if (data.from === 'MapScene') {
            this.settingsSceneActive = false;
            this.shopSceneActive = false;
            this.mapSceneActive = true;
            this.gameStatsActive = true;
        }
    }

    preload() {
        this.load.audio('menu_music', ['assets/sound/menu.mp3']);
        this.load.image('settingButtonBG', 'assets/sprites/badge_hexagon_yellow.png');
        this.load.image('settingButtonIcon', 'assets/icons/icon_gear_gold.png');
        this.load.image('shopButtonBG', 'assets/sprites/badge_hexagon_green.png');
        this.load.image('shopButtonIcon', 'assets/icons/icon_shop_red.png');
        this.load.image('mapButtonBG', 'assets/sprites/badge_hexagon_red.png');
        this.load.image('mapButtonIcon', 'assets/icons/icon_map.png');
        this.load.image('backButtonBG', 'assets/sprites/badge_hexagon_purple.png');
        this.load.image('backButtonIcon', 'assets/icons/icon_ui-arrow-left_LP.png');
    }

    create() {

        var menu_music = this.sound.add('menu_music', {volume: 0.025});
        menu_music.loop = true;
        menu_music.play();

        var guiGroup = this.add.container();
        var guiHeader = this.add.container();
        guiGroup.add(guiHeader);
        var guiFooter = this.add.container();
        guiGroup.add(guiFooter);

        /* BACKBUTTON */
        var backButtonGroup = this.add.container();
        backButtonGroup.setSize(128, 128);
        backButtonGroup.setInteractive();
        backButtonGroup.input.cursor = 'pointer';

        var backButtonText = this.add.text(
            0, 
            0,
            'Zurück',
        ).setStyle({
            fontFamily: 'Fredoka',
            fontSize: '20px', 
            color: '#ffffff',
            stroke: '#00000080',
            strokeThickness: 4,
        });
        backButtonText.setOrigin(0.5, 0.5);
        backButtonText.y = 8;
        var backButtonBG = this.add.sprite(
            0,
            0,
            'backButtonBG'
        ).setAngle(
            20
        ).setDisplaySize(
            128,
            128
        ).setOrigin(0.5, 0.5);
        backButtonBG.width = 128;
        backButtonBG.height = 128;
        var backButtonIcon = this.add.sprite(
            0,
            0,
            'backButtonIcon'
        ).setDisplaySize(
            64,
            64
        ).setOrigin(0.5, 0.5);
        backButtonIcon.y = -32;
        backButtonIcon.width = 128;
        backButtonIcon.height = 128;

        if (this.mapSceneActive == true || this.gameSceneActive == true) {
            backButtonGroup.visible = false;
            console.log(backButtonGroup);
        }

        backButtonGroup.add(backButtonBG);
        backButtonGroup.add(backButtonIcon);
        backButtonGroup.add(backButtonText);
        backButtonGroup.setSize(128, 128);
        backButtonGroup.setPosition(96, 96);
        guiHeader.add(backButtonGroup);

        /* SETTINGSBUTTON */
        var settingButtonGroup = this.add.container();
        settingButtonGroup.setSize(128, 128);
        settingButtonGroup.setInteractive();
        settingButtonGroup.input.cursor = 'pointer';

        var settingButtonText = this.add.text(
            0, 
            0,
            'Einstellungen',
        ).setStyle({
            fontFamily: 'Fredoka',
            fontSize: '20px', 
            color: '#ffffff',
            stroke: '#00000080',
            strokeThickness: 4,
        });
        settingButtonText.setOrigin(0.5, 0.5);
        settingButtonText.y = 8;
        var settingButtonBG = this.add.sprite(
            0,
            0,
            'settingButtonBG'
        ).setAngle(
            20
        ).setDisplaySize(
            128,
            128
        ).setOrigin(0.5, 0.5);
        settingButtonBG.width = 128;
        settingButtonBG.height = 128;
        var settingButtonIcon = this.add.sprite(
            0,
            0,
            'settingButtonIcon'
        ).setDisplaySize(
            64,
            64
        ).setOrigin(0.5, 0.5);
        settingButtonIcon.y = -32;
        settingButtonIcon.width = 128;
        settingButtonIcon.height = 128;

        if (this.settingsSceneActive == true) {
            settingButtonGroup.removeInteractive();
            var settingButtonActiveCircle = this.add.graphics();
            settingButtonActiveCircle.fillStyle(
                0xFFFFFF, 1
            );
            settingButtonGroup.add(settingButtonActiveCircle);
            settingButtonActiveCircle.fillCircle(0, 0, 8);
            settingButtonActiveCircle.setPosition(0, 64);
        }

        settingButtonGroup.add(settingButtonBG);
        settingButtonGroup.add(settingButtonIcon);
        settingButtonGroup.add(settingButtonText);
        settingButtonGroup.setSize(128, 128);
        settingButtonGroup.setPosition(this.scale.baseSize.width - 96, 96);
        guiHeader.add(settingButtonGroup);

        /* SHOPBUTTON */
        var shopButtonGroup = this.add.container();
        shopButtonGroup.setSize(128, 128);
        shopButtonGroup.setInteractive();
        shopButtonGroup.input.cursor = 'pointer';

        var shopButtonText = this.add.text(
            0, 
            0,
            'Shop',
        ).setStyle({
            fontFamily: 'Fredoka',
            fontSize: '20px', 
            color: '#ffffff',
            stroke: '#00000080',
            strokeThickness: 4,
        });
        shopButtonText.setOrigin(0.5, 0.5);
        shopButtonText.y = 8;
        var shopButtonBG = this.add.sprite(
            0,
            0,
            'shopButtonBG'
        ).setAngle(
            20
        ).setDisplaySize(
            128,
            128
        ).setOrigin(0.5, 0.5);
        shopButtonBG.width = 128;
        shopButtonBG.height = 128;
        var shopButtonIcon = this.add.sprite(
            0,
            0,
            'shopButtonIcon'
        ).setDisplaySize(
            64,
            64
        ).setOrigin(0.5, 0.5);
        shopButtonIcon.y = -32;
        shopButtonIcon.width = 128;
        shopButtonIcon.height = 128;

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
        shopButtonGroup.add(shopButtonIcon);
        shopButtonGroup.add(shopButtonText);
        shopButtonGroup.setSize(128, 128);
        shopButtonGroup.setPosition(96, this.scale.baseSize.height - 96);
        guiFooter.add(shopButtonGroup);

        /* MAPBUTTON */
        var mapButtonGroup = this.add.container();
        mapButtonGroup.setSize(128, 128);
        mapButtonGroup.setInteractive();
        mapButtonGroup.input.cursor = 'pointer';
        var mapButtonText = this.add.text(
            0, 
            0,
            'Karte',
        ).setStyle({
            fontFamily: 'Fredoka',
            fontSize: '20px', 
            color: '#ffffff',
            stroke: '#00000080',
            strokeThickness: 4,
        });
        mapButtonText.setOrigin(0.5, 0.5);
        mapButtonText.y = 8;
        var mapButtonBG = this.add.sprite(
            0,
            0,
            'mapButtonBG'
        ).setAngle(
            -20
        ).setDisplaySize(
            128,
            128
        ).setOrigin(0.5, 0.5);
        mapButtonBG.width = 128;
        mapButtonBG.height = 128;
        var mapButtonIcon = this.add.sprite(
            0,
            0,
            'mapButtonIcon'
        ).setDisplaySize(
            64,
            64
        ).setOrigin(0.5, 0.5);
        mapButtonIcon.y = -32;
        mapButtonIcon.width = 128;
        mapButtonIcon.height = 128;

        if (this.mapSceneActive == true) {
            mapButtonGroup.removeInteractive();
            var mapButtonActiveCircle = this.add.graphics();
            mapButtonActiveCircle.fillStyle(
                0xFFFFFF, 1
            );
            mapButtonGroup.add(mapButtonActiveCircle);
            mapButtonActiveCircle.fillCircle(0, 0, 8);
            mapButtonActiveCircle.setPosition(0, 64);
        }

        mapButtonGroup.add(mapButtonBG);
        mapButtonGroup.add(mapButtonIcon);
        mapButtonGroup.add(mapButtonText);

        mapButtonGroup.setSize(128, 128);
        mapButtonGroup.setPosition(this.scale.baseSize.width - 96, this.scale.baseSize.height - 96);
        guiFooter.add(mapButtonGroup);

        settingButtonGroup.on(
            'pointerdown', function() {
                this.scene.start('SettingsScene');
            }, this
        );
        shopButtonGroup.on(
            'pointerdown', function() {
                this.scene.start('ShopScene');
            }, this
        );
        mapButtonGroup.on(
            'pointerdown', function() {
                this.scene.start('MapScene');
            }, this
        );

    }
}

export { GUIScene };