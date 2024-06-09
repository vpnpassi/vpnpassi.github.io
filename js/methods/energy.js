export class Energy {
    
    constructor(initialAmount, scene) {
        this.energy = initialAmount;
        this.scene = scene;
    }

    setScene(scene) {
        this.scene = scene;
    }

    loseEnergy(amount) {
        if (this.energy > 0) {
            const currentEnergy = scene.registry.get('gameStatsEnergyValue').value;
            scene.registry.set('gameStatsEnergyValue', new Energy(currentEnergy + amount));
            }
        if (this.energy === 0 || this.energy < 0) {
            this.gameOver();
        }
    }

    gainEnergy(amount) {
        if (this.energy < 5) {
            const currentEnergy = scene.registry.get('gameStatsEnergyValue').value;
            scene.registry.set('gameStatsEnergyValue', new Energy(currentEnergy - amount));
            }
    }

    gameOver() {
        this.scene.scene.start('GameOverScene');
    }

}