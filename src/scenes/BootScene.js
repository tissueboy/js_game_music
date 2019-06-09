// import makeAnimations from '../helpers/animations';

class BootScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'BootScene'
        });
    }
    preload() {
        const progress = this.add.graphics();

        // Register a load progress event to show a load bar
        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
        });

        // Register a load complete event to launch the title screen when all files are loaded
        this.load.on('complete', () => {
            // prepare all animations, defined in a separate file
            // makeAnimations(this);
            progress.destroy();
            // this.scene.start('TitleScene');
            this.scene.start('GameScene');
        });

        this.load.image('next_tap_1', 'assets/images/next_tap/1.png');
        this.load.image('next_tap_2', 'assets/images/next_tap/2.png');
        this.load.image('next_tap_3', 'assets/images/next_tap/3.png');
        this.load.image('next_tap_4', 'assets/images/next_tap/4.png');
        this.load.image('next_tap_5', 'assets/images/next_tap/5.png');
        this.load.image('next_tap_6', 'assets/images/next_tap/6.png');
        this.load.image('next_tap_7', 'assets/images/next_tap/7.png');
        this.load.image('next_tap_8', 'assets/images/next_tap/8.png');
        this.load.image('next_tap_9', 'assets/images/next_tap/9.png');
        this.load.image('next_tap_10', 'assets/images/next_tap/10.png');

        this.load.image('tap_area_1', 'assets/images/tap_area_1.png');
        this.load.image('tap_area_2', 'assets/images/tap_area_2.png');


        // this.load.tilemapTiledJSON('map', 'assets/tilemaps/tilemap.json');
        //spritesheetは画像のサイズを合わせないとframe errorになる...
        this.load.spritesheet('next_tap', 'assets/images/next_tap.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('title_start', 'assets/images/title_start.png');    
    }
}

export default BootScene;
