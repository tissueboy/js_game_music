export default class NoteBar extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene,config.x, config.y,config.key,config.type);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    this.alive = true;
    this.type = config.type;
    this.overlapNoteNumb = 0;
  }
  update(){
    this.scene.physics.world.overlap(this, this.scene.noteGroup.children.entries,
      function(bar,note){
        // console.log("==overlap=="+note.type);
        // bar.alpha = 0.2;
      }
    ); 
  }

  checkNote(noteNumb){
    console.log("==noteNumb=="+noteNumb);
    this.overlapNoteNumb = noteNumb;
    this.scene.physics.world.overlap(this, this.scene.noteGroup.children.entries,
      function(bar,note){
        console.log("==note.overlapNoteNumb=="+bar.overlapNoteNumb);
        console.log("==note.type           =="+note.type);
        if(note.type === bar.overlapNoteNumb){
          note.destroy();
        }
        // bar.alpha = 0.2;
      }
    );  
  }
}