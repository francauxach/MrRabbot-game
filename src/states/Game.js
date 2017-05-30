/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'

export default class extends Phaser.State {
  init () {}
  preload () {
      this.game.load.spritesheet('player', './assets/images/player.png', 32, 32)
      this.game.load.spritesheet('campFire', './assets/images/campFire.png', 64, 64)
      this.game.load.image('carrot', './assets/images/carrot.png')
  }

  create () {
    this.score = 0;
    this.map = this.game.add.tilemap('tilemap');
    this.map.addTilesetImage('tiles', 'tiles');

    this.backgroundLayer = this.map.createLayer('Background');
    this.groundLayer = this.map.createLayer('Trees');

      // //Before you can use the collide function you need to set what tiles can collide
    this.map.setCollisionBetween(1, 1000, true, 'Trees');

    //Change the world size to match the size of this layer
    // this.backgroundLayer.resizeWorld();


    this.player = this.game.add.sprite(125, 75, 'player')

    this.game.physics.arcade.enable(this.player)
    this.game.physics.arcade.enable(this.backgroundLayer)
    this.game.camera.setSize(800,500)
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON)

    this.player.body.gravity.y = 0
    this.player.body.allowRotation = false;
    this.player.body.setSize(32, 16, 0, 16)

    this.cursor = game.input.keyboard.createCursorKeys()

    this.player.frame = 1
    this.player.animations.add('down', [0, 1, 2, 3, 0], 10, false)
    this.player.animations.add('left', [4, 5, 6, 7, 4], 10, false)
    this.player.animations.add('right', [8, 9, 10, 11, 8], 10, false)
    this.player.animations.add('up', [12, 13, 14, 15, 12], 10, false)

      this.createItems();
      this.createCampFires();

  }
    createItems() {
        //create items
        this.carrots = this.game.add.group();
        this.carrots.enableBody = true;
        this.carrot1 = this.game.add.sprite(125, 630, 'carrot')
        this.carrots.add(this.carrot1)
        this.carrot2 = this.game.add.sprite(325, 430, 'carrot')
        this.carrots.add(this.carrot2)
        this.carrot3 = this.game.add.sprite(510, 530, 'carrot')
        this.carrots.add(this.carrot3)
        this.carrot4 = this.game.add.sprite(510, 225, 'carrot')
        this.carrots.add(this.carrot4)
        this.carrot5 = this.game.add.sprite(880, 325, 'carrot')
        this.carrots.add(this.carrot5)
        this.carrot6 = this.game.add.sprite(710, 850, 'carrot')
        this.carrots.add(this.carrot6)
        this.carrot7 = this.game.add.sprite(880, 525, 'carrot')
        this.carrots.add(this.carrot7)
        this.carrot8 = this.game.add.sprite(325, 850, 'carrot')
        this.carrots.add(this.carrot8)
    }

    createCampFires() {
      this.campFires = this.game.add.group();
      this.campFires.enableBody = true;
      this.campFire1 = this.game.add.sprite(495, 100, 'campFire')
      this.campFires.add(this.campFire1)
      this.campFire1.animations.add('fire', [0,1,2,3], 8, false)
      this.campFire2 = this.game.add.sprite(495, 735, 'campFire')
      this.campFires.add(this.campFire2)
      this.campFire2.animations.add('fire', [0,1,2,3], 8, false)
      this.campFire3 = this.game.add.sprite(835, 835, 'campFire')
      this.campFires.add(this.campFire3)
      this.campFire3.animations.add('fire', [0,1,2,3], 8, false)
      this.campFire4 = this.game.add.sprite(680, 60, 'campFire')
      this.campFires.add(this.campFire4)
      this.campFire4.animations.add('fire', [0,1,2,3], 8, false)
      this.campFires.forEach( (campFire) => {
      campFire.body.setSize(32,48, 24, 12)
      })
    }

    collect(player, collectable) {
      //TODO: Level up score
        collectable.destroy();
    }

    shake(player, enemy) {
        this.game.camera.shake(0.05, 200)
    }

  update(){
      this.game.physics.arcade.collide(this.player, this.groundLayer)
      this.game.physics.arcade.overlap(this.player, this.carrots, this.collect, null, this);
      this.game.physics.arcade.overlap(this.player, this.campFires, this.shake, null, this);

      this.fireCampsAnimation()

      this.inputs()
      // if (this.player.body) {
      //     if (this.player.body.touching.down) {
      //         if (this.hasJumped) {
      //             this.dustSound.play();
      //             this.dust.x = this.player.x;
      //             this.dust.y = this.player.y + 10;
      //             this.dust.start(true, 300, null, 8);
      //         }
      //         this.hasJumped = false
      //     }
      // }
  }

  fireCampsAnimation () {
      this.campFire1.animations.play('fire');
      this.campFire2.animations.play('fire');
      this.campFire3.animations.play('fire');
      this.campFire4.animations.play('fire');
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
