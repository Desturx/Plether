<template>
    <div class="page-parent">
        
        <div class="top-icons">
            <v-icon v-if="!startDuelComponent" fill="#f4e8d9" scale="2" @click="router.go(-1)" name="ri-arrow-go-back-fill"  />
            <v-icon v-else fill="#f4e8d9" scale="2" @click="startDuelComponent = false" name="ri-arrow-go-back-fill"  />
        </div>

        <!-- We select the friend from here -->
        <FriendsToChallenge v-if="!startDuelComponent"
        :friends="friends"
        @startDuel="startDuel"/> 
        
        <StartChallenge v-else 
        :friend="friendSelected" />  

        <!-- <PhaserComponent v-if="gameActive"></PhaserComponent> -->
        
        <!-- Once the friend is selected, we start the duel -->
    </div>
    
    
   


</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { store } from '../store/store';
import FriendsToChallenge from '../components/viewComponents/SelectFriendToChallengeComponent.vue';
import StartChallenge from '../components/viewComponents/StartChallengeComponent.vue';
import PhaserComponent from '../components/phaserGames/collectStars/collectStarsComponent.vue'

import { useRouter } from 'vue-router';

const API = "http://localhost:5000/api"
const router = useRouter()
const friends = ref([])
const startDuelComponent = ref(false)
const friendSelected = ref()
const gameActive = ref(false)

onMounted(()=>{
    getFriends();

})

async function getFriends() {
    const url= API + "/users/friends/" + store.id;

    await axios.get(url, {withCredentials: true})
    .then((res)=>{
        console.log("el resultado de la petición: ", res)
        friends.value = res.data.friends
        console.log("el resultado de friends.value: ", friends.value)
    })
    .catch( (err)=>{
        console.log(err)
    })
    
    gameActive.value = true
}

function startDuel(friend) {
    console.log(friend)
    startDuelComponent.value = true
    friendSelected.value = friend;
}

</script>

<style  scoped>
.top-icons {
    margin: 1.5em 
}


</style>