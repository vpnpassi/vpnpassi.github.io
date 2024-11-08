import { showToast } from '../utilitys/utils.js';

export class Gems {
    
    constructor(initialAmount, scene) {
        this.scene = scene;
        this.gems = this.loadGems(initialAmount);
    }

    loseGems(amount) {
        if (this.gems > 0 && this.gems >= amount) {
            this.gems -= amount;
            this.scene.registry.set('gameStatsGemsValue', this);
            this.saveGems(this.gems);
        } else if (this.gems >= 0 && this.gems < amount) {
            showToast(this.scene, 'Achtung', 'Nicht genug Gems.');
        }
    }

    gainGems(amount) {
        this.gems += amount;
        this.scene.registry.set('gameStatsGemsValue', this);
        this.saveGems(this.gems);
    }

    saveGems(amount) {
        localStorage.setItem('gems', amount);
        this.loadGems();
    }

    loadGems(initialAmount) {
        const savedGems = localStorage.getItem('gems');
        this.scene.registry.set('gameStatsGemsValue', this);
        return savedGems !== null ? parseInt(savedGems) : initialAmount;
    }
}
