<template>
    <div class="page-parent">
        <!-- {{ $route.params.id }} -->
        <div class="top-icons">
            <v-icon fill="#f4e8d9" scale="2" @click="router.go(-1)" name="ri-arrow-go-back-fill"  />
            <v-icon fill="#f5b324" scale="2" name="md-staroutline-twotone" />
        </div>
        <div class="middle-content">
            <h2>{{ game.name }}</h2>
            <!-- <img src="@/assets/games/collect-stars.jpg" alt=""> -->
            <img :src="game.image" alt="">
            <div class="buttons">
                <button class="btn-submit" @click="goPlay"> jugar </button>
                <button class="btn-submit"> desafiar a jugador </button>
            </div>
        </div>

        <div class="scores-section">
            <div> <h2>Puntuaciones individuales</h2> </div>
            <div id="score-box">
                <div id="best-score">
                    <h3>La mejor: </h3>
                    <h3> 20.000</h3>
                </div>

                <div id="scores">
                    <table>
                        <tr>
                            <td>fecha</td>
                            <td>21231231</td>
                        </tr>
                        <tr>
                            <td>fecha</td>
                            <td>21231231</td>
                        </tr>
                        <tr>
                            <td>fecha</td>
                            <td>21231231</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref } from 'vue'
import axios from 'axios'
const game = ref([])

const API = "http://localhost:5000/api"

const router = useRouter();
const route = useRoute();

onMounted(()=>{
    getGame()
})


async function getGame() {
    const url=API + "/games/" + route.params.id
    console.log(url)
    await axios.get(url, { withCredentials: true })
    .then((res)=>{
        console.log(res)
        game.value = res.data.game
        let newImage = game.value.image.replace("src/assets/games/", "")
        game.value.image = new URL (`/src/assets/games/${newImage}`, import.meta.url)

    })
    .catch((err)=>{
        console.log(err)
    })
}

function goPlay() {
    let newRoute=game.value.name.replace(" ", "-")
    if(newRoute.includes("Collect-Stars")){
        console.log("LO CONTIENE")
        router.push({path: "/collectStars" })
    }
    
}

</script>

<style scoped>

.page-parent {
    /* background-color: blue; */
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit-content;
}   
.top-icons {
    display: flex;
    justify-content: space-between;
    margin: 1.5em;
}

.middle-content {
    width: 89%;
    margin: auto;
    /* background-color: yellowgreen; */
    & h2 {
        text-align: center;
        color: var(--Blanquito-hueso, #F4E8D9);
        text-align: center;
        font-family:'Inter', Inter;
        font-size: 2.5rem;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }
    & img {
        width: 100%;
    }
}
.buttons {
    display: flex;
    justify-content: space-around;
    margin-bottom: 1em;
}

.scores-section {
    display: flex;
    flex-direction: column;
    /* background-color: azure; */
    width:89%;
    margin: auto;
    & h2 {
        text-align: center;
        color: var(--blanquito-hueso);
        text-align: center;
        font-family: "Inter", Inter;
        font-size: 1.5rem;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        margin-bottom: 0.3em;
    }
}

#score-box {
    border: 1px solid var(--blanquito-hueso);
    padding-top: 1em;
    padding-bottom: 1em;
}

#best-score {
    display: flex;
    justify-content: space-around;

    & h3 {
        color: var(--blanquito-hueso);
        font-family: 'Inter',Inter;
        font-size: 1.5rem;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }
}

#scores {
    & table  { 
        width: 100%;

        & td {
            text-align: center;
            width: 50%;
            padding: 0.4em;
            /* background-color: blueviolet; */
            color: var(--Blanquito-hueso, #F4E8D9);
            text-align: center;
            font-family: 'Inter', Inter;
            font-size: 1.5rem;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
        }
    }
}
</style>