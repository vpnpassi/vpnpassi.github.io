export class Gold {

    constructor(initialAmount, scene) {
        this.gold = initialAmount;
        this.scene = scene;
    }

    loseGold(amount) {
        if (this.gold > 0 && this.gold > amount) {
            this.gold -= amount;
            this.scene.registry.set('gameStatsGoldValue', this);
        }
    }

    gainGold(amount) {
        this.gold += amount;
        this.scene.registry.set('gameStatsGoldValue', this);
    }

}