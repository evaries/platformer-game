import Phaser from 'phaser';
import playerAnimation from '../animation/player'

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player')
    // add player's sprite
    scene.add.existing(this);
    // add physics for player
    scene.physics.add.existing(this);

    this.init();
    this.initEvent();
  }

  init() {
    this.gravity = 500;
    this.playerSpeed = 150;
    this.jumpCount = 0;
    this.repeatedJump = 1;
    this.cursor = this.scene.input.keyboard.createCursorKeys();
    this.body.setGravityY(this.gravity)
    this.setCollideWorldBounds(true);
    playerAnimation(this.scene.anims)
  }

  // listening to update events from the scene 
  initEvent() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
  }

  update() {
    const { right, left, up, space } = this.cursor;
    // JustDown returns true only ones
    const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);
    const isUpJustDown = Phaser.Input.Keyboard.JustDown(up);
    const onFloor = this.body.onFloor();

    if (left.isDown) {
      this.setVelocityX(-this.playerSpeed);
      this.setFlipX(true);
    } else if (right.isDown) {
      this.setVelocityX(this.playerSpeed);
      this.setFlipX(false);
    } else {
      this.setVelocityX(0);
    }

    if ((isSpaceJustDown || isUpJustDown) && (onFloor || this.jumpCount < this.repeatedJump)) {
      this.setVelocityY(-this.playerSpeed * 2)
      this.jumpCount++;
    }

    if (onFloor) {
      this.jumpCount = 0;
    }

    onFloor
      ? this.body.velocity.x !== 0 ? this.play('run', true) : this.play('idle', true)
      : this.play('jump', true)
  }
}

export default Player;