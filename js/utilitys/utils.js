// ANIMATION
export function addAnimation(scene, animKey, spriteKey, start, end, prefix, suffix, repeat, frameRate) {
    if (!scene.anims.get(animKey)) {
        scene.anims.create({
            key: animKey,
            frames: scene.anims.generateFrameNames(spriteKey, { start: start, end: end, prefix: prefix, suffix: suffix }),
            repeat: repeat,
            frameRate: frameRate
        });
    } 
}

// SCENE SWITCHER
export function switchScene(currentScene, targetScene, level, timeLimit) {
    currentScene.scene.stop('InitScreen');
    currentScene.scene.stop('MenuScene');
    currentScene.scene.stop('ShopScene');
    currentScene.scene.stop('GUIScene');
    currentScene.scene.stop('GameScene');
    currentScene.scene.stop('PopUpScene');
    currentScene.scene.start(targetScene, {level: level, timeLimit: timeLimit});
    currentScene.scene.launch('GUIScene', {
        active: true, 
        from: targetScene,
        level: level,
        timeLimit: timeLimit,
    });
}

// BACKGROUND 
export function preloadBackground(scene) {
    scene.load.image('bg', `assets/images/background.png`);
}
export function createBackground(scene) {
    var backgroundImage = scene.add.image(0, 0, 'bg');
    backgroundImage.setOrigin(0.5, 0.5); 
    backgroundImage.x = scene.cameras.main.width / 2;
    backgroundImage.y = scene.cameras.main.height / 2;

    var scaleX = scene.cameras.main.width / backgroundImage.width;
    var scaleY = scene.cameras.main.height / backgroundImage.height;
    var scale = Math.max(scaleX, scaleY);
    backgroundImage.setScale(scale);

    scene.scale.on('resize', function (gameSize) {
        var width = gameSize.width;
        var height = gameSize.height;

        scene.cameras.resize(width, height);

        backgroundImage.setPosition(width / 2, height / 2);

        scaleX = width / backgroundImage.width;
        scaleY = height / backgroundImage.height;
        scale = Math.max(scaleX, scaleY);
        backgroundImage.setScale(scale);
    });
}

// SCENE ACTIVE STATUS
export function getSceneActiveStatus(scenes, key) {
    const scene = scenes.find(scene => scene.key === key);
    if (scene) {
        return scene.value;
    }
    return false;
}

export function updateSceneActiveStatus(scenes, key, newValue) {
    const scene = scenes.find(scene => scene.key === key);
    if (scene) {
        scene.value = newValue;
    }
}

// Toastmessage
export function showToast(scene, title, message) {

    const toast = scene.add.container();
    toast.setPosition(scene.scale.baseSize.width / 2, scene.scale.baseSize.height - 96);

    const toastTitle = scene.add.text(0, 0, title, {
        fontSize: '36px',
        fill: '#fff',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: { x: 10, y: 5 },
        borderRadius: 5
    }).setOrigin(0.5);

    const toastMessage = scene.add.text(0, 0, message, {
        fontSize: '18px',
        fill: '#fff',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: { x: 10, y: 5 },
        borderRadius: 5
    }).setOrigin(0.5);

    toast.add([toastTitle, toastMessage]);
    
    scene.tweens.add({
        targets: toast,
        alpha: { from: 1, to: 0 },
        ease: 'Cubic.easeOut',
        duration: 500,
        delay: 3000,
        onComplete: () => {
            toast.destroy();
        }
    });
}