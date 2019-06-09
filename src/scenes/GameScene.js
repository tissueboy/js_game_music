import NextTap from '../sprites/NextTap';
import NoteBar from '../sprites/NoteBar';
import Note from '../sprites/Note';

class GameScene extends Phaser.Scene {
  constructor(test) {
      super({
          key: 'GameScene'
      });
  }
  create(){

    this.score = 0;
    this.scoreText = this.add.text(60, 20, this.score).setScrollFactor(0, 0);

    this.tapArray = [1,2,3,4,5,6,7];
    this.tapAddArray = []
    this.nextPanelNumb = 0;

    this.timeText1 = this.add.text(60, 40,"0").setScrollFactor(0, 0);
    this.timeText2 = this.add.text(100, 40,"00").setScrollFactor(0, 0);

    this.time1 = 0;
    this.time2 = 0;

    this.gameMaxCount = 10;
    this.gameCount = 0;
    this.gameClear_flg = false;

    this.noteArray = [1,2,3,4,5,6,7];
    // this.tapAddArray = []

    /*縦の五線譜の表示
    ================*/
    for(var i = 0; i <= 4 ; i++){

      var line = new Phaser.Geom.Line(i*(this.sys.game.config.width/5), 0, i*(this.sys.game.config.width/5), this.sys.game.config.height);//x,y,x2,y2 開始(x1,y1),終点(x2,y2)

      var graphics = this.add.graphics({ lineStyle: { width: 1, color: 0xFFFFFF } });

      graphics.strokeLineShape(line);
    }


    /*画面下の音符のタッチ表示
    ================*/
    var touchLine = new Phaser.Geom.Line(0, 380, this.sys.game.config.width, 380);//x,y,x2,y2 開始(x1,y1),終点(x2,y2)

    var graphicsTouchLine = this.add.graphics({ lineStyle: { width: 1, htight: 1,color: 0xFFFFFF } });

    graphicsTouchLine.strokeLineShape(touchLine);

    /*判定用
    ================*/
    this.noteBarGroup = this.add.group();
    this.noteBarGroup.x = 0;
    this.noteBarGroup.y = 320;
    var noteBarY = 0;

    for(var i = 0; i <= 8 ; i++){
      if( i % 2 === 1){
        noteBarY = 40;
      }else{
        noteBarY = 0;
      }
      var noteBar = new NoteBar({
        scene: this,
        key:"tap_area_1",
        x: this.noteBarGroup.x + (i * (this.sys.game.config.width/10)) + 32,
        y: this.noteBarGroup.y - noteBarY,
        type: i,
      });
      
      this.noteBarGroup.add(noteBar);
    }
    /*音符の生成
    ================*/
    this.noteGroup = this.add.group();
    
    this.NoteTimer = this.time.addEvent({
      delay: 2000,
      callback: function() {
        // 0〜300までの乱数を吐き出す
        // var randNum = Math.floor(Math.random()*(300-0)+0);

        var random = Math.floor(Math.random() * this.noteArray.length);
        var randomNumb = this.noteArray[random];
    
        var note = new Note({
          scene: this,
          key:"next_tap_"+randomNumb,
          x: (randomNumb-1)*32 + 32,
          y: -40,
          type: randomNumb,
        });
        this.noteGroup.add(note);
      },
      callbackScope: this,
      loop: true
    });
    
    /*画面下の音符の表示
    ================*/
    this.noteDisplayGroup = this.add.group();
    this.noteDisplayGroup.x = 0;

    var noteDisplayY = 0;

    for(var i = 1; i <= 9 ; i++){
      if(i%2===0){
        noteDisplayY = 64;
      }else{
        noteDisplayY = 0;
      }
      var noteDisplay = new NextTap({
        scene: this,
        key:"next_tap_"+i,
        x: this.noteDisplayGroup.x + (i * (this.sys.game.config.width/10)),
        y: 450 - noteDisplayY,
        type: i,
      });
      noteDisplay.setInteractive();
      noteDisplay.on('pointerdown', function (pointer) {
        this.scene.noteBarGroup.children.entries[Number(this.type)-1].checkNote(Number(this.type));
      });
      this.noteDisplayGroup.add(noteDisplay);
    }

    /*メニュー表示
    ================*/

    this.menu = this.add.container(160, 200).setScrollFactor(0, 0).setInteractive();
    this.menu.setVisible(false);
    this.menu.setDepth(1);

    this.title_start = this.add.sprite(10, 10, 'title_start').setScrollFactor(0, 0).setInteractive();

    this.menu.add(this.title_start);

    this.menu.on('pointerdown', function (pointer) {
      console.log("click title");
    });

    this.title_start.on('pointerdown', function (pointer) {
      console.log("click title");

      this.scene.resetGame();

    });

    this.startCountDown = 3;
    this.startCount = this.add.text(100, 200,this.startCountDown).setScrollFactor(0, 0);

    this.world_start = false;
    this.disp_time = 0;
    this.disp_time_after = 0;
    this.startTimer = this.time.addEvent({
      delay: 1000,
      callback: function() {
        this.startCountDown--;
        if(this.startCountDown === 0){
          this.startCount.setVisible(false);
          this.world_start = true;
          this.disp_time_after = this.disp_time;
          this.startTimer.remove(false);
        }else{
          this.startCount.text = this.startCountDown;
        }
      },
      callbackScope: this,
      loop: true
    });    
  }


  update(time, delta) {
    this.noteGroup.children.entries.forEach(
      (sprite) => {
          sprite.update(time, delta);
      }
    );
    this.noteBarGroup.children.entries.forEach(
      (sprite) => {
          sprite.update(time, delta);
      }
    );

    if(this.world_start === true){
      this.timeText1.text = String(Math.floor((time - this.disp_time_after )*0.001));    
      this.timeText2.text = String(Math.floor(time - this.disp_time_after)).slice(-3).slice(0,2);  
    }else{
      this.disp_time = time;
    }
    if(this.gameClear_flg === true){
      this.timeText1.text = this.time1;    
      this.timeText2.text = this.time2;
    }else{
      this.time1 = String(Math.floor((time - this.disp_time_after )*0.001));
      this.time2 = String(Math.floor(time - this.disp_time_after)).slice(-3).slice(0,2);
    }

  }
  updateScore(score){
    this.scoreText.text = Number(this.scoreText.text) + Number(score);
  }

  gameClear(){
    this.gameOverText = this.add.text(90, 128, "GAME CLEAR", {
      fontFamily: 'monospace',
      fontSize: 24,
      fontStyle: 'bold',
      color: '#ffffff',
      style:{
      }
    });
    this.gameClear_flg = true;
    this.menu.setVisible(true);
  }
  resetGame(){
    console.log("resetGame");
    this.scene.start('GameScene');
  }
}

export default GameScene;
