import Phaser from 'phaser'
import config from "../config";

export default class extends Phaser.State {
    init () {

        this.titleText = this.game.make.text(this.game.world.centerX, 100, "Mr. Rabbot Game", {
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
        let playSound = config.gameOptions.playSound,
            playMusic = config.gameOptions.playMusic;

        let Options = this;

        this.game.add.sprite(0, 0, 'options-bg');
        this.game.add.existing(this.titleText);
        this.addMenuOption(playMusic ? 'Mute Music' : 'Play Music', function (target) {
            playMusic = !playMusic;
            target.text = playMusic ? 'Mute Music' : 'Play Music';
            config.musicPlayer.volume = playMusic ? 1 : 0;
        });
        this.addMenuOption(playSound ? 'Mute Sound' : 'Play Sound', function (target) {
            playSound = !playSound;
            target.text = playSound ? 'Mute Sound' : 'Play Sound';
        });
        this.addMenuOption('<- Back', function () {
            Options.game.state.start("GameMenu");
        });
    }

    render() {
    }

    addMenuOption(text, callback) {
        let optionStyle = { font: '30pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
        let txt = this.game.add.text(this.game.world.centerX, (this.optionCount * 80) + 300, text, optionStyle);
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