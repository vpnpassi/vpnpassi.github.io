import { showToast } from '../utilitys/utils.js';

export class Gold {

    constructor(initialAmount, scene) {
        this.scene = scene;
        this.gold = this.loadGold(initialAmount);
    }

    loseGold(amount) {
        if (this.gold > 0 && this.gold >= amount) {
            this.gold -= amount;
            this.scene.registry.set('gameStatsGoldValue', this);
            this.saveGold(this.gold);
        } else if (this.gold >= 0 && this.gold < amount) {
            showToast(this.scene, 'Achtung', 'Nicht genug Gold.');
        }
    }

    gainGold(amount) {
        this.gold += amount;
        this.scene.registry.set('gameStatsGoldValue', this);
        this.saveGold(this.gold);
    }

    saveGold(amount) {
        localStorage.setItem('gold', amount);
        this.loadGold();
    }

    loadGold(initialAmount) {
        const savedGold = localStorage.getItem('gold');
        this.scene.registry.set('gameStatsGoldValue', this);
        return savedGold !== null ? parseInt(savedGold) : initialAmount;
    }

}