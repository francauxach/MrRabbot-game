/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'

export default class extends Phaser.State {
  init () {}
  preload () {
      this.game.load.spritesheet('player', './assets/images/player.png', 32, 32)
      this.game.load.spritesheet('campFire', './assets/images/campFire.png', 64, 64)
      this.game.load.image('carrot', './assets/images/carrot.png')
      this.game.load.image('lair', './assets/images/lair.png')
      this.game.load.image('fireParticle', './assets/images/fireParticle.png')
      this.game.load.spritesheet('fireBall', './assets/images/fireBall.png', 32, 32)
  }

  create () {
    this.firerate = 0;
    this.nextFire = 0;
    this.carrotsCollected = 0;
    this.lives_tmp = window.game.globalVariables.lives
    this.score_tmp = window.game.globalVariables.score
    this.playerFired = false;
    this.timer = 0;
    this.map = this.game.add.tilemap('tilemap2');
    this.map.addTilesetImage('tiles', 'tiles');
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

    this.createItems();
    this.createLair();
    this.createCampFires();
    this.createFireballs();
    this.createHUD();
    this.setParticles();

    if (!this.game.device.desktop) {
      this.addMobileInputs()
    }

    this.game.time.events.repeat(Phaser.Timer.SECOND * 4, 500, this.fire, this);

  }

    fire() {
        window.game.globalVariables.fireBallSound.play();
        this.campFires.forEach( (campFire) => {
            var left = new Phaser.Point(campFire.x + 32, campFire.y + 32);
            this.weapon.fireAngle = 0;
            this.weapon.fire(left);

            var right = new Phaser.Point(campFire.x + 32, campFire.y + 32);
            this.weapon.fireAngle = 180;
            this.weapon.fire(right);

            var up = new Phaser.Point(campFire.x + 32, campFire.y + 32);
            this.weapon.fireAngle = -90;
            this.weapon.fire(up);

            var down = new Phaser.Point(campFire.x + 32, campFire.y + 32);
            this.weapon.fireAngle = 90;
            this.weapon.fire(down);
        })
    }

    createFireballs() {
        this.weapon = this.game.add.weapon(40, 'fireBall');

        this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

        this.weapon.bulletSpeed = 400;

        this.weapon.fireRate = 0;
    }

    setParticles() {
        this.fireParticles = this.game.add.emitter(0, 0, 20);
        this.fireParticles.makeParticles('fireParticle');
        this.fireParticles.setYSpeed(-100, 100);
        this.fireParticles.setXSpeed(-100, 100);
        this.fireParticles.gravity = 0;
    }

    createCampFires() {
        this.campFires = this.game.add.group();
        this.campFires.enableBody = true;
        this.campFire1 = this.game.add.sprite(400, 5, 'campFire')
        this.campFires.add(this.campFire1)
        this.campFire1.animations.add('fire', [0,1,2,3], 8, false)
        this.campFire2 = this.game.add.sprite(17, 388, 'campFire')
        this.campFires.add(this.campFire2)
        this.campFire2.animations.add('fire', [0,1,2,3], 8, false)
        this.campFire3 = this.game.add.sprite(335, 517, 'campFire')
        this.campFires.add(this.campFire3)
        this.campFire3.animations.add('fire', [0,1,2,3], 8, false)
        this.campFires.forEach( (campFire) => {
            campFire.body.setSize(32,48, 24, 12)
        })
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

    addMobileInputs() {

        this.mobileInputs = this.game.add.group();

        this.moveLeft = false;
        this.moveRight = false;
        this.moveUp = false;
        this.moveDown = false;

        this.leftButton = this.game.add.sprite(10, 530, 'left');
        this.leftButton.inputEnabled = true;
        this.leftButton.events.onInputOver.add(function(){this.moveLeft=true;}, this);
        this.leftButton.events.onInputOut.add(function(){this.moveLeft=false;}, this);
        this.leftButton.events.onInputDown.add(function(){this.moveLeft=true;}, this);
        this.leftButton.events.onInputUp.add(function(){this.moveLeft=false;}, this);
        this.leftButton.alpha = 0.5;
        this.mobileInputs.add(this.leftButton)

        this.rightButton = this.game.add.sprite(110, 530, 'right');
        this.rightButton.inputEnabled = true;
        this.rightButton.events.onInputOver.add(function(){this.moveRight=true;}, this);
        this.rightButton.events.onInputOut.add(function(){this.moveRight=false;}, this);
        this.rightButton.events.onInputDown.add(function(){this.moveRight=true;}, this);
        this.rightButton.events.onInputUp.add(function(){this.moveRight=false;}, this);
        this.rightButton.alpha = 0.5;
        this.mobileInputs.add(this.rightButton)

        this.upButton = this.game.add.sprite(60, 480, 'up');
        this.upButton.inputEnabled = true;
        this.upButton.events.onInputOver.add(function(){this.moveUp=true;}, this);
        this.upButton.events.onInputOut.add(function(){this.moveUp=false;}, this);
        this.upButton.events.onInputDown.add(function(){this.moveUp=true;}, this);
        this.upButton.events.onInputUp.add(function(){this.moveUp=false;}, this);
        this.upButton.alpha = 0.5;
        this.mobileInputs.add(this.upButton)

        this.downButton = this.game.add.sprite(60, 580, 'down');
        this.downButton.inputEnabled = true;
        this.downButton.events.onInputOver.add(function(){this.moveDown=true;}, this);
        this.downButton.events.onInputOut.add(function(){this.moveDown=false;}, this);
        this.downButton.events.onInputDown.add(function(){this.moveDown=true;}, this);
        this.downButton.events.onInputUp.add(function(){this.moveDown=false;}, this);
        this.downButton.alpha = 0.5;
        this.mobileInputs.add(this.downButton)

        this.mobileInputs.fixedToCamera = true;

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
        this.player = this.game.add.sprite(350, 25, 'player')
    }

    collect(player, collectable) {
        window.game.globalVariables.carrotEatingSound.play();
        collectable.destroy();
        this.carrotsCollected++;
        window.game.globalVariables.level2Completed = (this.carrotsCollected == 9)
        this.score_tmp += 100;
        this.scoreText.setText('Score: ' + this.score_tmp)
    }

    firing(player, enemy) {
        this.game.camera.shake(0.05, 100)
        this.fireParticles.x = this.player.x;
        this.fireParticles.y = this.player.y+10;
        window.game.globalVariables.hurtSound.play()
        this.fireParticles.start(true, 800, null, 15);
        this.playerFired = true;
        this.lives_tmp--;
        this.livesText.setText('Rabbits:    x' + this.lives_tmp)
        if (this.lives_tmp < 0) {
            this.game.state.start("GameOver");
        }
    }

    goToNextLevel(player, lair) {
        window.game.globalVariables.lives = this.lives_tmp;
        window.game.globalVariables.score = this.score_tmp;
        this.state.start('GameCompleted')
    }

  update(){
      this.game.physics.arcade.collide(this.player, this.groundLayer, this.colliding, null, this)
      this.game.physics.arcade.overlap(this.player, this.carrots, this.collect, null, this);
      if(!this.playerFired) {
          this.game.physics.arcade.overlap(this.player, this.campFires, this.firing, null, this);
          this.game.physics.arcade.overlap(this.player, this.weapon.bullets, this.firing, null, this);
      } else {
          this.timer++
          if (this.timer%50 == 0) {
              this.playerFired = false;
          }
      }

      if (window.game.globalVariables.level2Completed) {
          this.lairs.forEach( (lair) => {
              lair.visible = true
          })
          this.game.physics.arcade.overlap(this.player, this.lairs, this.goToNextLevel, null, this);
      }

      this.fireCampsAnimation()

      this.inputs()
  }

  fireCampsAnimation () {
      this.campFire1.animations.play('fire');
      this.campFire2.animations.play('fire');
      this.campFire3.animations.play('fire');
  }

    inputs () {
        if(this.cursor.down.isDown || (this.moveDown && !this.moveUp && !this.moveLeft && !this.moveRight)) {
            this.player.animations.play('down')
            this.player.body.velocity.y = +220
        } else {
            this.player.body.velocity.y = 0
        }

        if (this.cursor.left.isDown || this.moveLeft) {
            this.player.animations.play('left')
            this.player.body.velocity.x = -220
        } else {
            this.player.body.velocity.x = 0
        }

        if (this.cursor.right.isDown || this.moveRight) {
            this.player.animations.play('right')
            this.player.body.velocity.x = +220
        }

        if(this.cursor.up.isDown || this.moveUp) {
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
