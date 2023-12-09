<template>
    <div id="phaser-game"></div>
</template>

<script setup>
import Phaser from 'phaser';
import { onMounted, onUnmounted, ref } from 'vue';
import GameScene from './sceneTest.js'

const phaserGame = ref(null)
onUnmounted(()=>{
    if(phaserGame.value) {
        phaserGame.value.destroy;
    }
})

onMounted(()=>{

    const config = {
        type: Phaser.AUTO,
        width: 932,
        height: 430,
        parent: 'phaser-game',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300},
                debug: false
            }
        },
        scene: [GameScene]
        // scene: {
        //     preload: preload,
        //     create: create,
        //     update: update
        // }
    }

    phaserGame.value = new Phaser.Game(config)
})


// const platforms = ref();
// var stars, platforms, player, bombs
// var cursors
// var score = 0
// var scoretext
// var gameOver = ref(false)

// function preload() {
//     this.load.image('sky', 'src/assets/phaser/sky.png');
//     this.load.image('ground', 'src/assets/phaser/platform.png');
//     this.load.image('star', 'src/assets/phaser/star.png');
//     this.load.image('bomb', 'src/assets/phaser/bomb.png');
//     this.load.spritesheet('dude', 'src/assets/phaser/dude.png', { frameWidth: 32, frameHeight: 48 });
// }

// function create() {
//     // todos los objetos tienen su origen en el centro, por eso hay que ponerlos desplazados
//     // el orden en que cargan los elementos es importante
//     this.add.image(932/2, 430/2, 'sky');

//     scoretext = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000'})

//     createPlayer(this)
//     createStars(this)
//     createBombs(this)


//     platforms = this.physics.add.staticGroup();
//     // platforms.create(0, 430, 'ground').setScale(2).refreshBody()
//     platforms.create(0, 430, 'ground')
//     platforms.create(400, 430, 'ground')
//     platforms.create(800, 430, 'ground')

//     this.physics.add.collider(player, platforms);
//     this.physics.add.collider(stars, platforms);
//     this.physics.add.collider(bombs, platforms)
    

//     this.physics.add.overlap(player, stars, collectStar, null, this)
//     this.physics.add.collider(player, bombs, hitBomb, null, this)
//     cursors = this.input.keyboard.createCursorKeys();

// }

// function update() {
//     if(cursors.left.isDown){
//         player.setVelocityX(-160)
//         player.anims.play('left', true)
//     }
//     else if(cursors.right.isDown) {
//         player.setVelocityX(160)
//         player.anims.play('right', true)
//     }
//     else {
//         player.setVelocityX(0)
//         player.anims.play('turn')
//     }

//     if(cursors.up.isDown && player.body.touching.down){
//         player.setVelocityY(800)
//     }
// }

// watch(gameOver, (isGameOver)=>{
//     if(isGameOver === true){
//         console.log('JUEGO TERMINADO')
//     }
// })  


// function createPlayer(item) {
//     player = item.physics.add.sprite(100,200, 'dude')
//     player.setBounce(0.2);
//     player.setCollideWorldBounds(true)

//     item.anims.create({
//         key: 'left',
//         frames: item.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
//         frameRate: 10,
//         repeat: -1
//     })

//     item.anims.create({
//         key: 'turn', 
//         frames: [ {key: 'dude', frame: 4}],
//         frameRate: 20
//     })

//     item.anims.create({
//         key: 'right',
//         frames: item.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
//         frameRate: 10,
//         repeat: -1
//     })
// }

// function createStars(game) {
//     stars = game.physics.add.group({
//         key: 'star',
//         repeat: 10,
//         setXY: { x: 12, y: 0, stepX: 70 }
//     })

//     stars.children.iterate(function (child) {
//         child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
//     })
// }

// function createBombs(game) {
//     bombs = game.physics.add.group()

// }

// function collectStar(player, star) {
//     star.disableBody(true, true)
//     score +=10
//     scoretext.setText('Score: ' + score)

//     if(stars.countActive(true) === 0) 
//     {
//         stars.children.iterate((child)=>{
//             child.enableBody(true, child.x,  0, true, true)
//         });

//         var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400) 

//         var bomb = bombs.create(x, 16, 'bomb')
//         bomb.setBounce(1)
//         bomb.setCollideWorldBounds(true)
//         bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
//     }
// }

// function hitBomb(player, bomb) {
//     this.physics.pause()
//     player.setTint(0xff0000)
//     player.anims.play('turn')

//     gameOver.value = true;
// }


</script>




<style scoped>
#phaser-game {

}
</style>