export class Gems {
    
    constructor(initialAmount) {
        this.gems = initialAmount;
    }

    loseGems(amount) {
        if (this.gems > 0 && this.gems > amount) {
            this.gems -= amount;
        }
    }

    gainGems(amount) {
        this.gems += amount;
    }

}