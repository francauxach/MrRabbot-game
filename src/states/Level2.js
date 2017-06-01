/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'

export default class extends Phaser.State {
  init () {}
  preload () {
      this.game.load.spritesheet('player', './assets/images/player.png', 32, 32)
      // this.game.load.spritesheet('campFire', './assets/images/campFire.png', 64, 64)
      this.game.load.image('carrot', './assets/images/carrot.png')
      this.game.load.image('lair', './assets/images/lair.png')
  }

  create () {
    this.carrotsCollected = 0;
    this.lives_tmp = window.game.globalVariables.lives
    this.score_tmp = window.game.globalVariables.score
    this.map = this.game.add.tilemap('tilemap2');

    this.map.addTilesetImage('tiles2', 'tiles2');

    this.backgroundLayer = this.map.createLayer('Background');
    this.groundLayer = this.map.createLayer('Trees');

      // //Before you can use the collide function you need to set what tiles can collide
    this.map.setCollisionBetween(1, 1000, true, 'Trees');

    //Change the world size to match the size of this layer
    // this.backgroundLayer.resizeWorld();

    this.spawnPlayer();

    this.game.physics.arcade.enable(this.player)
    this.game.physics.arcade.enable(this.backgroundLayer)
    this.game.camera.setSize(950,368)
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT)

    this.player.body.gravity.y = 0
    this.player.body.allowRotation = false;
    this.player.body.setSize(32, 16, 0, 16)

    this.cursor = this.game.input.keyboard.createCursorKeys()

    this.player.frame = 1
    this.player.animations.add('down', [0, 1, 2, 3, 0], 10, false)
    this.player.animations.add('left', [4, 5, 6, 7, 4], 10, false)
    this.player.animations.add('right', [8, 9, 10, 11, 8], 10, false)
    this.player.animations.add('up', [12, 13, 14, 15, 12], 10, false)

    this.createLair();
    this.createItems();
    this.createHUD();

  }

    createLair() {
        this.lairs = this.game.add.group();
        this.lairs.enableBody = true
        this.lair1 = this.game.add.sprite(288, 540, 'lair');
        this.lairs.add(this.lair1);
        this.lairs.forEach( (lair) => {
            lair.body.setSize(32, 32, 24, 12)
            lair.visible = false;
        })

    }

    createHUD() {
      this.livesSheets = this.game.add.group();
      this.hud = this.game.add.group();
      this.hud.enableBody = false;
      this.livesText = this.add.text(650, 50, 'Rabbits:    x' + this.lives_tmp, { font: '45px Arial', fill: '#777777', align: 'center' })
      this.livesSheets.create(820, 55, 'player');
      this.scoreText = this.add.text(650, 150, 'Score: ' + this.score_tmp, { font: '45px Arial', fill: '#777777', align: 'center' })
      this.hud.add(this.livesText)
      this.hud.add(this.livesSheets)
      this.hud.add(this.scoreText)
      this.hud.fixedToCamera = true;
    }

    createItems() {
        //create items
        this.carrots = this.game.add.group();
        this.carrots.enableBody = true;
        this.carrot1 = this.game.add.sprite(210, 30, 'carrot')
        this.carrots.add(this.carrot1)
        this.carrot2 = this.game.add.sprite(35, 225, 'carrot')
        this.carrots.add(this.carrot2)
        this.carrot3 = this.game.add.sprite(290, 225, 'carrot')
        this.carrots.add(this.carrot3)
        this.carrot4 = this.game.add.sprite(470, 160, 'carrot')
        this.carrots.add(this.carrot4)
        this.carrot5 = this.game.add.sprite(170, 350, 'carrot')
        this.carrots.add(this.carrot5)
        this.carrot6 = this.game.add.sprite(95, 540, 'carrot')
        this.carrots.add(this.carrot6)
        this.carrot7 = this.game.add.sprite(550, 480, 'carrot')
        this.carrots.add(this.carrot7)
        this.carrot8 = this.game.add.sprite(450, 350, 'carrot')
        this.carrots.add(this.carrot8)
        this.carrot9 = this.game.add.sprite(290, 480, 'carrot')
        this.carrots.add(this.carrot9)
    }

    spawnPlayer() {
        this.player = this.game.add.sprite(400, 25, 'player')
    }

    collect(player, collectable) {
        window.game.globalVariables.carrotEatingSound.play();
        collectable.destroy();
        this.carrotsCollected++;
        window.game.globalVariables.level2Completed = (this.carrotsCollected == 9)
        this.score_tmp += 100;
        this.scoreText.setText('Score: ' + this.score_tmp)
    }

    goToNextLevel(player, lair) {
        window.game.globalVariables.lives = this.lives_tmp;
        window.game.globalVariables.score = this.score_tmp;
        this.state.start('GameCompleted')
    }

  update(){
      this.game.physics.arcade.collide(this.player, this.groundLayer)
      this.game.physics.arcade.overlap(this.player, this.carrots, this.collect, null, this);

      if (window.game.globalVariables.level2Completed) {
          this.lairs.forEach( (lair) => {
              lair.visible = true
          })
          this.game.physics.arcade.overlap(this.player, this.lairs, this.goToNextLevel, null, this);
      }

      this.inputs()
  }

    inputs () {
        if(this.cursor.down.isDown) {
            this.player.animations.play('down')
            this.player.body.velocity.y = +220
        } else {
            this.player.body.velocity.y = 0
        }

        if (this.cursor.left.isDown) {
            this.player.animations.play('left')
            this.player.body.velocity.x = -220
        } else {
            this.player.body.velocity.x = 0
        }

        if (this.cursor.right.isDown) {
            this.player.animations.play('right')
            this.player.body.velocity.x = +220
        }

        if(this.cursor.up.isDown) {
            this.player.animations.play('up')
            this.player.body.velocity.y = -220
        }
    }

  render () {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
