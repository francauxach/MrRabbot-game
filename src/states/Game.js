/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'

export default class extends Phaser.State {
  init () {}
  preload () {
      this.game.load.spritesheet('player', './assets/images/player.png', 32, 32)
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
    this.backgroundLayer.resizeWorld();


    this.player = this.game.add.sprite(125, 75, 'player')

    this.game.physics.arcade.enable(this.player)
    this.game.physics.arcade.enable(this.backgroundLayer)
    this.player.body.gravity.y = 0

    this.cursor = game.input.keyboard.createCursorKeys()

    this.player.frame = 1
    this.player.animations.add('down', [0, 1, 2, 3, 0], 10, false)
    this.player.animations.add('left', [4, 5, 6, 7, 4], 10, false)
    this.player.animations.add('right', [8, 9, 10, 11, 8], 10, false)
    this.player.animations.add('up', [12, 13, 14, 15, 12], 10, false)

      // this.createItems();
      // this.createDoors();

  }
    createItems() {
        //create items
        this.items = this.game.add.group();
        this.items.enableBody = true;
        var item;
        var result = this.findObjectsByType('item', this.map, 'objectsLayer');
        result.forEach(function(element){
            this.createFromTiledObject(element, this.items);
        }, this);
    }
    findObjectsByType(type, map, layer) {
        var result = []
        map.objects[layer].forEach(function(element){
            if(element.properties.type === type) {
                //Phaser uses top left, Tiled bottom left so we have to adjust the y position
                //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
                //so they might not be placed in the exact pixel position as in Tiled
                element.y -= map.tileHeight;
                result.push(element);
            }
        });
        return result;
    }

    //create a sprite from an object
    createFromTiledObject(element, group) {
        var sprite = group.create(element.x, element.y, element.properties.sprite);

        //copy all properties to the sprite
        Object.keys(element.properties).forEach(function(key){
            sprite[key] = element.properties[key];
        });
    }

    createDoors() {
        //create doors
        this.doors = this.game.add.group();
        this.doors.enableBody = true;
        var result = this.findObjectsByType('door', this.map, 'objectsLayer');

        result.forEach(function(element){
            this.createFromTiledObject(element, this.doors);
        }, this);
    }

    collect(player, collectable) {
        this.score += 10;
        this.scoreText.text = 'Score: ' + this.score;
        console.log('coleccionada');

        //remove sprite
        collectable.destroy();
    }

    enterDoor(player, door) {
        console.log('entering door that will take you to '+door.targetTilemap+' on x:'+door.targetX+' and y:'+door.targetY);
    }
  update(){
      this.game.physics.arcade.collide(this.player, this.groundLayer)
      // this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);
      // this.game.physics.arcade.overlap(this.player, this.doors, this.enterDoor, null, this);


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
