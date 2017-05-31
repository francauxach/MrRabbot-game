import Phaser from 'phaser'
import config from "../config";

export default class extends Phaser.State {
    init () {

        this.titleText = this.game.make.text(this.game.world.centerX, 200, "Mr. Rabbot Game", {
            font: 'bold 60pt TheMinion',
            fill: '#FDFFB5',
            align: 'center'
        });
        this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        this.titleText.anchor.set(0.5);
        this.optionCount = 1;
    }

    preload () {
    }

    create () {
        this.playSound_tmp = config.gameOptions.playSound;
        this.playMusic_tmp = config.gameOptions.playMusic;

        let Options = this;

        this.game.add.sprite(0, 0, 'options-bg');
        this.game.add.existing(this.titleText);
        this.addMenuOption(this.playMusic_tmp ? 'Mute Music' : 'Play Music', function (target) {
            Options.playMusic_tmp = !Options.playMusic_tmp;
            target.text = Options.playMusic_tmp ? 'Mute Music' : 'Play Music';
            Options.playMusic_tmp ? window.game.globalVariables.music.play() : window.game.globalVariables.music.stop();
        });
        this.addMenuOption('<- Back', function () {
            Options.game.state.start("GameMenu");
        });
    }

    render() {
    }

    addMenuOption(text, callback) {
        let optionStyle = { font: '30pt TheMinion', fill: '3A4014', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
        let txt = this.game.add.text(this.game.world.centerX, (this.optionCount * 80) + 270, text, optionStyle);
        txt.anchor.setTo(0.5);
        txt.stroke = "rgba(0,0,0,0";
        txt.strokeThickness = 4;
        let onOver = function (target) {
            target.fill = "#3A4014";
            target.stroke = "rgba(0,0,0,0)";
            txt.useHandCursor = true;
        };
        let onOut = function (target) {
            target.fill = "#3A4014";
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