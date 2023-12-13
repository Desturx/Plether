<template>
    <div class="content">
        <div class="challenge-title">
            <div v-if="isSender">
                <h3>TU</h3>
                <p>Has retado a {{ challenge.recieverName }}</p>
            </div>
            <div v-else>
                <h3>{{ challenge.senderName }}</h3>
                <p>Te ha retado a jugar</p>
            </div>
            
            <!-- <p>Has retado a pepe</p> -->
        </div>

        <!-- div que contiene las fotos de usuario con la espada cruzada -->
        <div class="challenge">
            <div id="player">
                <h3>Tu</h3>
                <div class="img-border">
                    <img src="/src/assets/svgs/profileIcon.svg" alt="">
                </div>
            </div>

            <div id="versus">
                <img src="/src/assets/svgs/versusImage.svg" alt="">
            </div>

            <div id="enemy">
                <div class="img-border">
                    <img src="/src/assets/svgs/profileIcon.svg" alt="">
                </div>
                <h3 v-if="isSender">{{ challenge.recieverName }}</h3>
                <h3 v-else >{{ challenge.senderName }}</h3>
                <!-- <h3>pepe</h3> -->
            </div>
        </div>

        <div id="btn-holder">
            <button v-if="showButton && !challengeEnded" class="btn-submit" @click="acceptDuel">Aceptar y jugar </button>
        </div>

        <div id="score">
            <div>
                <h2>Puntuaciones</h2>
            </div>
            <div id="score-box">
                <div id="player-score">
                    <h2>TU</h2>
                    <h2 v-if="isSender">{{ challenge.senderPoints }}</h2>
                    <h2 v-else>{{ challenge.recieverPoints }}</h2>

                </div>
                <div id="enemy-score">
                    
                        <h2 v-if="isSender">{{  challenge.recieverName }}</h2>
                        <h2 v-if="isSender">{{ challenge.recieverPoints }}</h2>
                    
                        <h2 v-if="!isSender"> {{ challenge.senderName }}</h2>
                        <h2 v-if="!isSender">{{ challenge.senderPoints }}</h2>
                    
                </div>

            </div>
        </div>

        <div id="btn-holder">
            <button v-if="challengeEnded && isSender" class="btn-submit" @click="endChallenge">Finalizar</button>
        </div>

    </div>
</template>


<script setup>

import axios from 'axios';
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { store } from '../store/store';

const API = "http://localhost:5000/api"
const route = useRoute()
const router = useRouter()

const challenge = ref([])
const isSender = ref(false)
const showButton = ref(true)
const challengeEnded = ref(false)

onMounted(()=>{
    getChallenge()
})

function acceptDuel() {
    router.push({ path: `/collectStars/${challenge.value.senderId}/false`})
}

function endChallenge() {
    console.log("TERMINADO EL CHALLENGE")
    //TO-DO: hacer que cuando se termine el challenge:
    // 1 - se muestre la pantalla de victoria o derrota
    // caso en el que el el que manda el desafio es el usuario
    if(isSender.value === true) {
        // si manda el desafio, gana si los puntos del sender son mayores
        if(challenge.value.senderPoints > challenge.value.recieverPoints) {
            console.log("HAS GANADO")
        } 
        else {
            console.log("HAS PERDIDO")
        }
    } else {
        if(challenge.value.senderPoints > challenge.value.recieverPoints) {
            console.log("HAS PERDIDO")
        } else {
            console.log("HAS GANADO")
        }
    }

    // 2 - se elimine el challenge de la base de datos.
}

function checkScores() {
    // console.log("El challenge: ", challenge.value)
    var puntos1 = false
    var puntos2 = false;
    if(challenge.value.recieverPoints !== null && challenge.value.recieverPoints >= 0) {
        // console.log('hay puntos de receptor')
        puntos1 = true;
    }

    if(challenge.value.senderPoints !== null && challenge.value.senderPoints >= 0) {
        // console.log('hay puntos de emisor')
        puntos2 = true;
    }

    if(puntos1 && puntos2) {
        console.log("SE HA TERMINADO EL CHALLENGE")
        challengeEnded.value = true;
    }
}

async function getChallenge() {
    const url = API + "/challenges/challenge/" + route.params.id

    await axios.get(url, { withCredentials: true })
    .then((res)=>{
        console.log('Respuesta de getChallenge:', res)
        challenge.value = res.data
        
        if(res.data.senderId === store.id) {
            console.log("es el sender")
            isSender.value = true;
            // si lo ha mandado quitar el botón.
            showButton.value = false
        } 
    })
    .catch((err)=>{
        console.log('Error de getChallenge: ',err)
    })


    checkScores()


}




</script>

<style scoped>

.content {
    margin-top: 2em;
}
#score {
    display: flex;
    flex-direction: column;
    width: 95%;
    margin-right: auto;
    margin-left: auto;
    margin-top: 1em;

    & h2 {
        text-align: center;
        color: var(--blanquito-hueso);
        text-align: center;
        font-family: 'Inter';
        font-size: 1.5rem;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }
}

#score-box {
    /* background-color:brown; */
    border: 2px solid var(--blanquito-hueso);
    height: fit-content;
    padding: 20px;
}


#player-score {
    /* background-color: blueviolet; */
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    padding-top: 5px;
    padding-bottom: 1em;
    padding-left: 10px;
    padding-right: 10px;
    border-bottom: 2px solid var(--blanquito-hueso);
}

#enemy-score {
    /* background-color: blueviolet; */
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1em;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;
}
.img-border {
    border: 2px solid var(--blanquito-hueso);
    width: 8.1em;
    height: 8.1em;
    border-radius: 100px;
}

.challenge-title {
    background-color: var(--naranja);
    text-align: center;
    margin:auto;
    width: 85%;
    border-radius: 50px;
    color: var(--blanquito-hueso);
    text-align: center;
    font-family: Inter;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    padding: 8px;

    & p {
        font-size: 1rem; 
    }

}

.challenge {
    margin-top: 1.5em;
    display: flex;
    flex-direction: row;
    /* background-color: aquamarine; */
    width: 95%;
    margin-left: auto;
    margin-right: auto;
    
}

#player {
    /* background-color: brown; */
    margin: auto;
    text-align: center;
    & img {
        width: 6em;
    }

    & h3 {
        color: var(--blanquito-hueso);
        text-align: center;
        font-family: 'Inter';
        font-size: 1.5rem;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        /* margin-top: 1em; */
        margin-bottom: 0.3em
    }
}

#versus {
    /* background-color: beige; */
    margin: auto;
    & img {
        width: 8em;
    }
}

#enemy {
    /* background-color: chocolate; */
    margin: auto;
    text-align: center;
    & img {
        width: 6em;
    }

    & h3 {
        color: var(--blanquito-hueso);
        text-align: center;
        font-family: 'Inter';
        font-size: 1.5rem;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        margin-top: 0.3em;
        /* margin-bottom: 1em; */
    }
}

#btn-holder {
    display: flex;
    justify-content: center;
}
.btn-submit {
    width: fit-content;
    padding: 9px;
}
</style>