export class Gems {
    
    constructor(initialAmount, scene) {
        this.gems = initialAmount;
        this.scene = scene;
    }

    loseGems(amount) {
        if (this.gems > 0 && this.gems > amount) {
            this.gems -= amount;
            this.scene.registry.set('gameStatsGemsValue', this);
        }
    }

    gainGems(amount) {
        this.gems += amount;
        this.scene.registry.set('gameStatsGemsValue', this);
    }

}