export class Gold {
    
    constructor(initialAmount) {
        this.gold = initialAmount;
    }

    loseGold(amount) {
        if (this.gold > 0 && this.gold > amount) {
            this.gold -= amount;
        }
    }

    gainGold(amount) {
        this.gold += amount;
    }

}