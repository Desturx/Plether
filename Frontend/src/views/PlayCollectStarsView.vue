<template>
   <PhaserComponent @send-score="recieveScore"></PhaserComponent>
</template>

<script setup>
// import '../phaserGame.js'
// For testing
import PhaserComponent from '../components/phaserGames/collectStars/collectStarsComponent.vue'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { store } from '@/store/store'
import axios from 'axios'

const API = "http://localhost:5000/api"
const route = useRoute()
const isChallenge = ref(false)
const isSender = ref(false)

onMounted(()=>{
   if(route.params.recieverId) {
      // console.log("existen los dos")
      isChallenge.value = true;
   }

   if(route.params.isSender === 'true') {
      isSender.value = true
   }
})

function recieveScore(score) {
   console.log(score)

   if(isChallenge.value) {
      updateScore(score)
   } else {
      uploadScore(score)
   }
}

async function updateScore(score) {
   const url = API + '/challenges/updateScore'
   console.log("Se mantiene la score?", score)
   if(isSender.value === true) {
      await axios.post(url, {
         senderId: store.id,
         recieverId: route.params.recieverId,
         senderPoints: score
      }, { withCredentials: true})
      .then((res)=>{
         console.log('Nueva score del emisor: ', res)
      })
      .catch((err)=>{
         console.log(err)
      })
   } else {
      await axios.post(url, {
         senderId: route.params.recieverId,
         recieverId: store.id,
         recieverPoints: score
      }, { withCredentials: true})
      .then((res)=>{
         console.log('Nueva score del receptor: ', res)
      })
      .catch((err)=>{
         console.log(err)
      })
   }


   
}

async function uploadScore(score) {
    console.log("Id starsgame: ", store.idStarsGame )
    console.log("id usuario: ", store.id)

    const url = API + "/points"
    // console.log(url)
   
    await axios.post(url, {
        userId: store.id,
        gameId: store.idStarsGame,
        points: score,
        date: new Date()
    }, {withCredentials: true})
    .then((res)=>{
        console.log(res)

    })
    .catch((error)=>{
        console.log(error)
    })
}


</script>

