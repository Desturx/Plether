<template>
    <div v-if="showScore" class="showScore" @click="sendNextPage">
        <h1>PUNTUACIÓN</h1>
        <h2>{{ showPoints }}</h2>
    </div>
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
const showScore = ref(false)
const showPoints = ref(0)


const emits = defineEmits(['sendScore'])

onMounted(()=> {
    
    const config = {
        type: Phaser.AUTO,
        // backgroundColor: '#2dab2d',
        scale: {
            mode: Phaser.Scale.RESIZE,
            parent: 'phaser-game',
            width: '932px',
            height: '430px'
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 400},
                debug: false
            }
        },
        scene: [GameScene],
        camera: {
            widht: 932,
            height: 430
        },
    };

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
        // console.log("EL JUGADOR MUERE")
        showScore.value = true;
        showPoints.value = starsGame.points;
        
        emits('sendScore', showPoints.value)
        // uploadScore()

    }
    // abandonar la room anterior, unirse a la nueva
  }
)

function sendNextPage() {
    // router.go(-1)
    router.push({path: '/'})
}
  
</script>


<style scoped>

.showScore {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.609);
    text-align: center;
    padding: 170px 0;
    color: var(--blanquito-hueso);
    font-family: 'Inter';
    font-size: 1.5em;



}

</style>