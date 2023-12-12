<template>
    <div class="overlay-background">
        <div class="overlay">

            <div class="item" v-for="challenge in challenges" :key="challenge.id">
                <ChallengeComponent v-if="challenge.isSender">
                    <div class="user">
                        <img src="@/assets/svgs/profileIcon.svg" alt="">
                        <p>Tu</p>
                    </div>
                    <div class="versus">
                        <img src="@/assets/svgs/versusImage.svg" alt="">
                        <p>vs</p>
                        <button @click="goToChallenge(challenge)">ver</button>
                    </div>
                    <div class="enemy">
                        <img src="@/assets/svgs/profileIcon.svg" alt="">
                        <p>{{ challenge.recieverName }}</p>
                    </div>
                </ChallengeComponent>
               <ChallengeComponent v-else>
                    <div class="enemy">
                        <img src="@/assets/svgs/profileIcon.svg" alt="">
                        <p>{{ challenge.senderName }}</p>
                    </div>
                    <div class="versus">
                        <img src="@/assets/svgs/versusImage.svg" alt="">
                        <p>vs</p>
                        <button @click="goToChallenge(challenge)">ver</button>
                    </div>
                    <div class="user">
                        <img src="@/assets/svgs/profileIcon.svg" alt="">
                        <p>Tu</p>
                    </div>
                    
               </ChallengeComponent>
            </div>
            <!-- <div class="item">
                <div class="user">
                    <img src="@/assets/svgs/profileIcon.svg" alt="">
                    <p>Tu</p>
                </div>
                <div class="versus">
                    <img src="@/assets/svgs/versusImage.svg" alt="">
                    <p>vs</p>
                    <button>ver</button>
                </div>
                <div class="enemy">
                    <img src="@/assets/svgs/profileIcon.svg" alt="">
                    <p>usuario 2</p>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { store } from '@/store/store'
import axios from 'axios';
import ChallengeComponent from '../components/viewComponents/challengeComponent.vue'
import router from '../router';

const API = "http://localhost:5000/api"

const challenges = ref([])

onMounted(()=>{
    getChallenges();
})


function goToChallenge(challenge) {
    console.log("El desafio: ", challenge)
    router.push({path: `/challenge/${challenge._id}`})
}

async function getChallenges() {
    var url = API + "/challenges/" + store.id

    await axios.get(url, { withCredentials: true })
    .then((res)=>{
        console.log(res)
        challenges.value = res.data
    })
    .catch((err)=>{
        console.log(err)
    })



    challenges.value.forEach(challenge => {
        if(challenge.senderId === store.id) {
            // console.log('LO MANDA ESTE USUARIO')
            challenge.isSender = true;
        }
        else if(challenge.recieverId === store.id) {
            // console.log('LO RECIBE ESTE USUARIO')
            challenge.isSender = false;
        }
    });

    console.log(challenges.value)
}

</script>

<style scoped>

.item {
    background-color: var(--naranja);
    display: flex;
    justify-content: space-around;
    width: 89%;
    margin-right: auto;
    margin-left: auto;
    margin-top: 1em;
    border-radius: 10px;
    padding-top: 8px;
    padding-bottom: 8px;
    color: var(--blanquito-hueso);
    font-family: 'Inter';
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

}

.user {
    & img {
        width: 4em;
        border: 2px solid var(--blanquito-hueso);
        border-radius: 100px;
        padding: 4px;
    }
    & p {
        text-align: center;
    }
}

.versus {
    display: flex;
    flex-direction: column;
    
    & img {

        width: 2em;
        
    }
    & p {
        text-align: center;
        font-size: 1rem;
        font-style: italic;
        font-weight: 700;
        line-height: normal;
    }

    & button {
        margin-top: 1.2em;
        width: 4.3em;
        height: 1.6em;
        border: 2px solid var(--blanquito-hueso);
        border-radius: 10px;
        background-color: var(--naranja);
        color: var(--blanquito-hueso);
    }
}

.enemy {
    & img {
        width: 4em;
        border: 2px solid var(--blanquito-hueso);
        border-radius: 100px;
        padding: 4px;
    }
    & p {
        text-align: center;
    }
}

.overlay-background {
    height: 100%;
    max-width: 430px;
    width: 100%;
    position: absolute;
    background: rgba(51, 47, 51, 0.50);    
}
.overlay {
    position: absolute;
    left: 129px;
    height: 83%;
    max-width: 301px;
    width: 70%;
    background-color: #F4E8D9;
    opacity: 100%;
    border-top-left-radius: 1.2em;
    border-bottom-left-radius: 1.2em;
}
</style>
