export class Energy {
    
    constructor() {
        this.energy = 5;
        console.log(`Current energy: ${this.energy}`);
    }

    updateEnergy() {
        for (var i = 1; i <= 5; i++) {
            var energyDiv = document.getElementById('energy' + i);
            switch(true) {
                case i <= this.energy:
                    energyDiv.className = 'health_icon';
                    break;
                default:
                    energyDiv.className = 'health_icon health_disabled';
                    break;
            }
        }
    }

    loseEnergy() {
        if (this.energy > 0) {
            this.energy--;
            this.updateEnergy();
            this.showSnackbar(`Du hast ein Leben verloren, aktuell hast Du noch <b>${this.energy}</b> leben.`);
            if (this.energy === 0) {
                this.gameOver();
            }
        }
    }

    gainEnergy() {
        if (this.energy < 5) {
            this.energy++;
            this.updateEnergy();
            this.showSnackbar(`Du hast ein Leben dazu bekommen, aktuell hast Du noch <b>${this.energy}</b> leben.`);
        }
    }

    showSnackbar(energy) {
        var snackbar = document.getElementById('snackbar');
        var snackbarText = document.getElementById('snackbar_text');
        snackbar.className = "show";
        snackbarText.innerHTML = energy;
        setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 5000);
    }

    gameOver() {
        console.log("GAME OVER");
    }

}