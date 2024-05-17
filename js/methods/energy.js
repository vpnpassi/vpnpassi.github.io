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
            this.energy -= amount
        }
        if (this.energy === 0 || this.energy < 0) {
            this.gameOver();
        }
    }

    gainEnergy(amount) {
        if (this.energy < 5) {
            this.energy += amount;
        }
    }

    gameOver() {
        this.scene.scene.start('GameOverScene');
    }

}