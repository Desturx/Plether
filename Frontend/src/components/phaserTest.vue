<template>
    <div id="phaser-game"></div>
</template>

<script setup>
import Phaser from 'phaser';
import { onMounted, ref } from 'vue';

const phaserGame = ref(null)

onMounted(()=>{

    const config = {
        type: Phaser.AUTO,
        widht: window.innerWidth,
        height: window.innerHeight,
        parent: 'phaser-game',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300},
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    }

    phaserGame.value = new Phaser.Game(config)
})

// const platforms = ref();
var platforms
function preload() {
    this.load.image('sky', 'src/assets/phaser/sky.png');
    this.load.image('ground', 'src/assets/phaser/platform.png');
    this.load.image('star', 'src/assets/phaser/star.png');
    this.load.image('bomb', 'src/assets/phaser/bomb.png');
    this.load.spritesheet('dude', 'src/assets/phaser/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create() {
    // todos los objetos tienen su origen en el centro, por eso hay que ponerlos desplazados
    // el orden en que cargan los elementos es importante
    this.add.image(932/2, 430/2, 'sky');

    platforms = this.physics.add.staticGroup();

    // platforms.create(0, 430, 'ground').setScale(2).refreshBody()
    // platforms.create(400, 430, 'ground').setScale(2).refreshBody();
    platforms.create(0, 430, 'ground')
    platforms.create(400, 430, 'ground')



}

function update() {

}
</script>


<style scoped>
#phaser-game {

}
</style>