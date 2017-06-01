import Phaser from 'phaser'

export default class extends Phaser.State {
    init () {
    }

    preload () {
        this.optionCount = 1;
    }

    create () {
        window.game.globalVariables.music.stop();
        window.game.globalVariables.wellDoneSound.play();
        this.game.add.sprite(0, 0, 'gameover-bg');
        let gameOver = this;
        let titleStyle = { font: 'bold 60pt TheMinion', fill: '#FDFFB5', align: 'center'};
        let subTitleStyle = { font: 'bold 45pt TheMinion', fill: '#FDFFB5', align: 'center'};
        let finalScoreStyle = { font: 'bold 30pt TheMinion', fill: '#662F1D', align: 'center'};
        let text = this.game.add.text(this.game.world.centerX, 200, "Congratulations!!", titleStyle);
        let text2 = this.game.add.text(this.game.world.centerX, 300, "Game Completed", subTitleStyle);
        let text3 = this.game.add.text(this.game.world.centerX, 370, window.game.globalVariables.lives > 0 ? "Your final score: " + window.game.globalVariables.score * window.game.globalVariables.lives : "Your final score: " + window.game.globalVariables.score, finalScoreStyle);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        text.anchor.set(0.5);
        text2.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        text2.anchor.set(0.5);
        text3.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        text3.anchor.set(0.5);
        window.game.globalVariables.lives = 3;
        window.game.globalVariables.score = 0;
        this.addMenuOption('Play Again', function (e) {
            window.game.globalVariables.wellDoneSound.stop();
            gameOver.game.state.start("Game");
        });
        this.addMenuOption('Main Menu', function (e) {
            window.game.globalVariables.wellDoneSound.stop();
            gameOver.game.state.start("GameMenu");
        })
    }

    render() {
    }

    addMenuOption(text, callback) {
        let optionStyle = { font: '30pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
        let txt = this.game.add.text(this.game.world.centerX, (this.optionCount * 80) + 400, text, optionStyle);
        txt.anchor.setTo(0.5);
        txt.stroke = "rgba(0,0,0,0";
        txt.strokeThickness = 4;
        let onOver = function (target) {
            target.fill = "#FEFFD5";
            target.stroke = "rgba(200,200,200,0.5)";
            txt.useHandCursor = true;
        };
        let onOut = function (target) {
            target.fill = "white";
            target.stroke = "rgba(0,0,0,0)";
            txt.useHandCursor = false;
        };
        //txt.useHandCursor = true;
        txt.inputEnabled = true;
        txt.events.onInputUp.add(callback, this);
        txt.events.onInputOver.add(onOver, this);
        txt.events.onInputOut.add(onOut, this);

        this.optionCount ++;
    }
}