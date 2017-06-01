import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#EDEEC9'
  }

  preload () {
    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
    this.load.tilemap('tilemap', './assets/tilemaps/levelOne.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('tilemap2', './assets/tilemaps/levelTwo.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tiles', './assets/images/tiles.png');
    this.load.image('tiles2', './assets/images/tiles2.png');
    this.load.image('menu-bg', './assets/images/menu-bg.jpg');
    this.load.image('options-bg', './assets/images/options-bg.jpg');
    this.load.image('gameover-bg', './assets/images/gameover-bg.jpg');
    this.load.image('brand', './assets/images/logo.png');
    this.load.image('stars', './assets/images/stars.jpg');
    this.load.image('loading', './assets/images/loading.png');

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //Change the background colour
    this.game.stage.backgroundColor = "#7fff7f";
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    //have the game centered horizontally
    this.game.stage.scale.pageAlignHorizontally = true;
    this.game.stage.scale.pageAlignVertically = true;
  }

  render () {
      this.state.start('Splash')
  }
}
