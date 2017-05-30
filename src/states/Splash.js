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

      let splash = this;

      setTimeout(function () {
          splash.state.start('GameMenu')
      }, 1000);
  }

  loadBgm() {
      this.game.load.audio('dangerous', './assets/bgm/Dangerous.mp3');
      this.game.load.audio('exit', './assets/bgm/Exit the Premises.mp3');
  }

  addGameMusic() {
      this.music = this.game.add.audio('dangerous');
      this.music.loop = true;
      this.music.play();
  }
}
