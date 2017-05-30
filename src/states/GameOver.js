import Phaser from 'phaser'

export default class extends Phaser.State {
    init () {
    }

    preload () {
        this.optionCount = 1;
    }

    create () {
        this.game.add.sprite(0, 0, 'gameover-bg');
        let gameOver = this;
        let titleStyle = { font: 'bold 60pt TheMinion', fill: '#FDFFB5', align: 'center'};
        let text = this.game.add.text(game.world.centerX, 100, "Game Over", titleStyle);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        text.anchor.set(0.5);
        this.addMenuOption('Play Again', function (e) {
            gameOver.game.state.start("Game");
        });
        this.addMenuOption('Main Menu', function (e) {
            gameOver.game.state.start("GameMenu");
        })
    }

    render() {
    }

    addMenuOption(text, callback) {
        let optionStyle = { font: '30pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
        let txt = this.game.add.text(game.world.centerX, (this.optionCount * 80) + 300, text, optionStyle);
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