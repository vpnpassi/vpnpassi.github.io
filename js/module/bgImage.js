export function preloadBackground(scene) {
    scene.load.image('bg', 'assets/images/background_main.png');
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