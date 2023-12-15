import Phaser from 'phaser'
import { starsGame } from '@/store/store'

class GameScene extends Phaser.Scene {
    constructor() 
    {
        super('GameScene')
    }
    stars;
    platforms;
    player;
    bombs;
    cursors;
    score = 0;
    scoretext;
    gameOver = false;
    scoreMutilplier = 0;

    preload() {
        let path = 'http://localhost:5173/'
        this.load.image('sky', path + 'src/assets/phaser/sky.png');
        this.load.image('ground', path + 'src/assets/phaser/platform.png');
        this.load.image('star', path + 'src/assets/phaser/star.png');
        this.load.image('bomb', path + 'src/assets/phaser/bomb.png');
        this.load.image('wall', path + 'src/assets/phaser/wall.png')
        this.load.spritesheet('dude', path + 'src/assets/phaser/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    
    create() {
        // todos los objetos tienen su origen en el centro, por eso hay que ponerlos desplazados
        // el orden en que cargan los elementos es importante

        this.add.image(932/2, 430/2, 'sky');
    
        this.scoretext = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000'})
    
        this.createPlayer()
        this.createStars()
        this.createBombs()
    
        this.walls  = this.physics.add.staticGroup();
        this.walls.create(0, 215, 'wall')
        this.walls.create(934, 215, 'wall')

        this.platforms = this.physics.add.staticGroup();
        // platforms.create(0, 430, 'ground').setScale(2).refreshBody()
        this.platforms.create(0, 430, 'ground')
        this.platforms.create(400, 430, 'ground')
        this.platforms.create(800, 430, 'ground')
        
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.stars, this.walls);
        this.physics.add.collider(this.bombs, this.platforms, this.bounceBomb, null, this)
        this.physics.add.collider(this.bombs, this.walls);
        
    
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this)
        this.cursors = this.input.keyboard.createCursorKeys();



    }

    // resize (gameSize, baseSize, displaySize, resolution) {
    //     const width = gameSize.width;
    //     const height = gameSize.height;

    //     this.cameras.resize(width, height);
    // }
    
    update() {
        if(this.cursors.left.isDown){
            this.player.setVelocityX(-160)
            this.player.anims.play('left', true)
        }
        else if(this.cursors.right.isDown) {
            this.player.setVelocityX(160)
            this.player.anims.play('right', true)
        }
        else {
            this.player.setVelocityX(0)
            this.player.anims.play('turn')
        }
    
        if(this.cursors.up.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-330)
        }



        this.stars.children.iterate(function (child) {
            if(child.body.touching.down) {
                if(child.body.bounce.y > 0 && child.body.bounce.x > 0) {
                    child.setBounce(child.body.bounce.x - 0.2, child.body.bounce.y - 0.1)
                } else {
                    child.setBounce(0, 0)
                    child.setVelocity(0, 0)

                    // child.setVelocity(child.body.velocity., 0)
                }
            }
        })

    }
    
    
    createPlayer() {
        this.player = this.physics.add.sprite(100,200, 'dude')
        this.player.setBounce(0.2);
        // this.player.setCollideWorldBounds(true)
    
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        })
    
        this.anims.create({
            key: 'turn', 
            frames: [ {key: 'dude', frame: 4}],
            frameRate: 20
        })
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        })
    }
    
    createStars() {

        this.stars = this.physics.add.group()
        
        
        for (let index = 0; index < 5; index++) {
            let star = this.stars.create(Phaser.Math.Between(100, 832), Phaser.Math.Between(0, 200), 'star')
            star.setBounce(1)
            star.setVelocity(Phaser.Math.Between(-200, 200), 20)
            // star.setCollideWorldBounds(true)
        }
    
        // this.stars.children.iterate(function (child) {
        //     child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
        // })
    }
    
    createBombs() {
        this.bombs = this.physics.add.group()
    
    }
    
    collectStar(player, star) {
        star.disableBody(true, true)
        this.score +=10 + this.scoreMutilplier
        this.scoretext.setText('Score: ' + this.score)
    
        if(this.stars.countActive(true) === 0) 
        {
            this.stars.children.iterate((child)=>{
                child.enableBody(true, Phaser.Math.Between(100, 832), Phaser.Math.Between(0, 200), true, true)
                child.setBounce(1)
                star.setVelocity(Phaser.Math.Between(-200, 200), 20)
            });
            this.scoreMutilplier += 10
    
            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400) 
    
            var bomb = this.bombs.create(x, 16, 'bomb')
            bomb.setBounce(1)
            // bomb.setCollideWorldBounds(true)
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
        }
    }
    
    hitBomb(player, bomb) {
        this.physics.pause()
        player.setTint(0xff0000)
        player.anims.play('turn')
        this.gameOver = true;
        starsGame.setGameOver(this.gameOver)
        starsGame.setPoints(this.score)
        
    }

    bounceBomb(bomb, platform){
        // just in case i want to do something when the bomb bounces of a platform
        // console.log()
        // Phaser.Math.
        // Phaser.Math.RandomXY(bomb.body.velocity, 500);

    }
}



export default GameScene;