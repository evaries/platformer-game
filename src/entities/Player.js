import Phaser, { Scene } from 'phaser';

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player')

    // add player's sprite
    scene.add.existing(this);

    // add physics for player
    scene.physics.add.existing(this);
  }
}

export default Player;