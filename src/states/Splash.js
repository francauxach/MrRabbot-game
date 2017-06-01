import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import GameMenu from "./GameMenu";

export default class extends Phaser.State {
  init () {
      this.loadingBar = this.game.make.sprite(this.game.world.centerX-(387/2), 400, "loading");
      this.logo       = this.game.make.sprite(this.game.world.centerX, 200, 'brand');
      this.status     = this.game.make.text(this.game.world.centerX, 380, 'Loading...', {fill: 'white'});
      centerGameObjects([this.logo, this.status]);
  }

  preload () {
      this.loadBgm();
      this.game.add.sprite(0, 0, 'stars');
      this.game.add.existing(this.logo).scale.setTo(0.5);
      this.game.add.existing(this.loadingBar);
      this.game.add.existing(this.status);
      this.load.setPreloadSprite(this.loadingBar);
    // this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    // this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    // centerGameObjects([this.loaderBg, this.loaderBar])
    //
    // this.load.setPreloadSprite(this.loaderBar)
    // //
    // // load your assets
    // //
    // this.load.image('player', 'assets/images/player.png')
  }

  create () {
      this.status.setText('Ready!');
      this.addGameMusic();
      this.addGameSounds();

      let splash = this;

      setTimeout(function () {
          splash.state.start('GameMenu')
      }, 1000);
  }

  loadBgm() {
      this.game.load.audio('dangerous', './assets/bgm/Dangerous.mp3');
      this.game.load.audio('carrotEating', './assets/bgm/CarrotEating.mp3');
      this.game.load.audio('wellDone', './assets/bgm/WellDone.mp3');
      this.game.load.audio('fireBallSound', './assets/bgm/NFF-fireball.wav');
      this.game.load.audio('hurtSound', './assets/bgm/NFF-kid-hurt.wav');
      this.game.load.audio('collisionSound', './assets/bgm/NFF-spit.wav');
  }

  addGameMusic() {
      window.game.globalVariables.music = this.game.add.audio('dangerous');
      window.game.globalVariables.music.loop = true;
  }

  addGameSounds() {
    window.game.globalVariables.carrotEatingSound = this.game.add.audio('carrotEating');
    window.game.globalVariables.carrotEatingSound.loop = false;
    window.game.globalVariables.fireBallSound = this.game.add.audio('fireBallSound');
    window.game.globalVariables.fireBallSound.loop = false;
    window.game.globalVariables.hurtSound = this.game.add.audio('hurtSound');
    window.game.globalVariables.hurtSound.loop = false;
    window.game.globalVariables.collisionSound = this.game.add.audio('collisionSound');
    window.game.globalVariables.collisionSound.loop = false;
    window.game.globalVariables.wellDoneSound = this.game.add.audio('wellDoneSound');
    window.game.globalVariables.wellDoneSound.loop = true;
  }
}
