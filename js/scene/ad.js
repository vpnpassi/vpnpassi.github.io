class AdScene extends Phaser.Scene {
    constructor() {
        super({ key: 'AdScene' });
    }

    init(data) {
        this.callback = data.callback;
        this.videoAdPool = [
            'assets/videos/video1.mp4',
            'assets/videos/video2.mp4',
            'assets/videos/video3.mp4',
            'assets/videos/video4.mp4'
        ];
    }

    preload() {
        const randomVideoAd = this.videoAdPool[Math.floor(Math.random() * this.videoAdPool.length)];
        this.load.video('adVideo', randomVideoAd);
    }


    create() {

        this.video = this.add.video(this.scale.width / 2, this.scale.height / 2, 'adVideo');

        this.timerText = this.add.text(
            0, 
            0, 
            'Ad wird geladen...'
        ).setStyle({
            fontFamily: 'Fredoka',
            fontSize: '64px',
            fontStyle: 'bold',
            color: '#ffffff',
        }).setOrigin(0.5, 0.5);
        this.timerText.setPosition(this.scale.width / 2, 96);

        this.video.video.addEventListener('loadeddata', () => {
            this.video.play();
        });

        this.video.on('play', () => {
            this.remainingTime = Math.ceil(this.video.getDuration());
            this.timerText.setText(this.remainingTime);

            this.time.addEvent({
                delay: 1000,
                callback: this.updateTimer,
                callbackScope: this,
                loop: true
            });            

            this.disableInput();
        });

        this.video.video.addEventListener('ended', () => {
            this.video.destroy();
            if (this.callback) {
                this.enableInput();
                this.callback();
            }
            this.scene.stop('AdScene');
            this.scene.stop('PopUpScene');
        });
    }

    updateTimer() {
        if (this.remainingTime > 0) {
            this.remainingTime--;
            this.timerText.setText(this.remainingTime);
        } else {
            this.timerText.setText('0');
        }
    }

    disableInput() {
        this.scene.manager.scenes.forEach(scene => {
            if (scene.input) {
                scene.input.enabled = false;
            }
        });
    }

    enableInput() {
        this.scene.manager.scenes.forEach(scene => {
            if (scene.input) {
                scene.input.enabled = true;
            }
        });        
    }

}

export { AdScene };