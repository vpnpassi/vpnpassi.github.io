import { showToast } from '../utilitys/utils.js';

export class Energy {
    
    constructor(initialAmount, scene) {
        this.scene = scene;
        this.energy = this.loadEnergy(initialAmount);
    }

    loseEnergy(amount) {
        if (this.energy > 0 && this.energy >= amount) {
            this.energy -= amount;
            this.scene.registry.set('gameStatsEnergyValue', this);
            this.saveEnergy(this.energy);
        } else if (this.energy >= 0 && this.energy < amount) {
            this.gameOver();
        }
    }

    gainEnergy(amount) {
        if (this.energy < 5 && this.energy + amount <= 5) {
            this.energy += amount;
            this.scene.registry.set('gameStatsEnergyValue', this);
            this.saveEnergy(this.energy);
        } else {
            showToast(this.scene, 'Achtung', 'NMaximale Energy erreicht.');
        }
    }

    saveEnergy(amount) {
        localStorage.setItem('energy', amount);
        this.loadEnergy();
    }

    loadEnergy(initialAmount) {
        const savedEnergy = localStorage.getItem('energy');
        this.scene.registry.set('gameStatsEnergyValue', this);
        return savedEnergy !== null ? parseInt(savedEnergy) : initialAmount;
    }

    gameOver() {
        showToast(this.scene, 'Achtung', 'Game Over.');
    }
}