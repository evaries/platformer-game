import Phaser from 'phaser';
import Player from '../entities/Player';

class Play extends Phaser.Scene {
  constructor() {
    super('PlayScene');
  }

  create() {
    this.playerSpeed = 200;
    const map = this.createMap();
    const layers = this.createLayers(map);
    this.player = this.createPlayer();
    this.createCollider(this.player, layers)
    this.createCursor();
  }

  update() {
    this.createMovement();
  }


  createMap() {
    const map = this.make.tilemap({ key: 'map' });
    map.addTilesetImage('main_lev_build_1', 'tiles-1');
    return map
  }

  createLayers(map) {
    const tileset = map.getTileset('main_lev_build_1');
    //layers are stacked on each other one by one, order is matter
    const platformCollider = map.createLayer('plaform_colliders', tileset);
    const enviroment = map.createLayer('environment', tileset);
    const platform = map.createLayer('platforms', tileset);

    // setCollisionByExclusion crate collision for !0 value in json's template
    // or can add custom property in Tiled and use it ('colides' in this case)
    platformCollider.setCollisionByProperty({ colides: true });
    return { enviroment, platform, platformCollider }
  }

  createPlayer() {
    const player = new Player(this, 100, 200);
    player.body.setGravityY(500)
    player.setCollideWorldBounds(true);
    return player;
  }

  createCollider(player, layers) {
    this.physics.add.collider(player, layers.platformCollider);
  }

  createCursor() {
    this.cursor = this.input.keyboard.createCursorKeys();
  }

  createMovement() {
    const { left, right } = this.cursor
    if (left.isDown) {
      this.player.setVelocityX(-this.playerSpeed)
    } else if (right.isDown) {
      this.player.setVelocityX(this.playerSpeed)
    } else {
      this.player.setVelocityX(0)
    }
  }

}
export default Play;