export default class Note extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene,config.x, config.y,config.key,config.type);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    this.alive = true;
    this.type = config.type;
    this.body.setVelocityY(100);
  }
  update(){
    if(this.y > this.scene.sys.game.config.height){
      this.destroy();
    }
  }

  // checkNote(){
  //   console.log("chceck note="+this.type);
  // }
}