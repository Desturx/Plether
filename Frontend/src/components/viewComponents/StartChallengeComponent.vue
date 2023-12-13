<template>
    <div class="content">
        <div class="challenge-title">
            <h3>TU</h3>
            <p>Has retado a {{ friend.name }}</p>
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
                <h3>{{ friend.name }}</h3>
            </div>
        </div>

        <div id="btn-holder">
            <button class="btn-submit" @click="sendChallenge">Mandar desafio y jugar </button>
        </div>

        <div id="score">
            <div>
                <h2>Puntuaciones</h2>
            </div>
            <div id="score-box">
                <div id="player-score">
                    <h2>TU</h2>
                    <h2>----</h2>
                </div>
                <div id="enemy-score">
                    <h2>{{  friend.name }}</h2>
                    <h2>----</h2>
                </div>

            </div>
        </div>


    </div>
</template>

<script setup>
const prop = defineProps(['friend'])

import axios from 'axios'
import { store } from '../../store/store';
import { useRouter } from 'vue-router';
import { socket, messageTypes } from '@/socket'
const API = "http://localhost:5000/api"
const router = useRouter()

async function sendChallenge() {
    var id
    // console.log(prop.friend._id)
    // console.log( prop.friend.mail)
    // sacamos el id desde la petición al servidor con us email
    
    var url = API + "/users/userByMail/" + prop.friend.mail
    console.log('La url: ', url)
    await axios.get(url, {withCredentials: true})
    .then((res)=>{
        console.log(res)
        id = res.data._id
    })
    .catch((err)=>{
        console.log(err)
    })
    console.log("el id guardado en el var: ", id)

    url = API + "/challenges"
    await axios.post(url, {
        senderId: store.id,
        recieverId: id,
        senderName: store.username,
        recieverName: prop.friend.name,
    }, {withCredentials: true})
    .then((res)=>{
        console.log('El resultado del challenge: ', res)
        // TO-DO: mandar socket.io al server

        socket.emit('challenge friend', { 
            recieverId: id,
            senderId: store.id,
            senderName: store.username,
            message: messageTypes.CHALLENGE_REQUEST
        })

        router.push({ path: `/collectStars/${id}/true`})
    })
    .catch((err)=>{
        console.log(err)
    })

}



</script>


<style scoped>
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