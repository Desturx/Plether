<template>
    <div id="phaser-game"></div>
</template>

<script setup>
import Phaser from 'phaser';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import GameScene from './collectStars.js'
import { starsGame } from '@/store/store'
import { useRouter } from 'vue-router';


const router = useRouter();
const phaserGame = ref(null)

onMounted(()=>{
    const config = {
        type: Phaser.AUTO,
        width: 932,
        height: 430,
        parent: 'phaser-game',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 400},
                debug: false
            }
        },
        scene: [GameScene]
    }

    phaserGame.value = new Phaser.Game(config)
})

onUnmounted(()=>{
    if(phaserGame.value) {
        phaserGame.value.destroy;
    }
})

watch(
  ()=> starsGame.isGameOver,
  (newValue)=>{
    if(newValue === true){
        console.log("EL JUGADOR MUERE")
        
    }
    // abandonar la room anterior, unirse a la nueva
  }
)

</script>