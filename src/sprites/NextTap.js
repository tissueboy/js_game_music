export default class NextTap extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene,config.x, config.y,config.key,config.type);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    this.alive = true;
    this.type = config.type;
    // this.anims.play(config.key);
    // this.frame = 1;
  }
}