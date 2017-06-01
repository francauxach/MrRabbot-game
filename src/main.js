import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState from './states/Game'
import Level2State from './states/Level2'
import GameMenuState from './states/GameMenu'
import GameOverState from './states/GameOver'
import GameCompletedState from './states/GameCompleted'
import OptionsState from './states/Options'

import config from './config'

class Game extends Phaser.Game {
  constructor () {
    const docElement = document.documentElement
    const width = config.gameWidth;
    const height = config.gameHeight;

    super(width, height, Phaser.CANVAS, 'content', null)
    // super(950, 950, Phaser.CANVAS, 'content', null)

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Game', GameState, false)
    this.state.add('Level2', Level2State, false)
    this.state.add('GameMenu', GameMenuState, false)
    this.state.add('GameOver', GameOverState, false)
    this.state.add('GameCompleted', GameCompletedState, false)
    this.state.add('Options', OptionsState, false)

    this.state.start('Boot')
  }
}

window.game = new Game()

window.game.globalVariables = {
  music: null,
  wellDoneSound: null,
  carrotEatingSound: null,
  fireBallSound: null,
  hurtSound: null,
  collisionSound: null,
  level1Completed: false,
  level2Completed: false,
  lives: 3,
  score: 0,
}
