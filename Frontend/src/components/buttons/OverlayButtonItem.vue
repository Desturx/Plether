<template>
    <div class="box" @click="sendToDestination">
            <div class="overlap-group">
                <p :class="textClass" >{{text}}</p>
                <img class="mando-icono" alt="Mando icono" :src="'/src/assets/iconosBotones/' + imgSrc" />
            </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const emit = defineEmits(['closeOverlays'])


const props = defineProps({
    text: String,
    imgSrc: String,
    textClass: String,
    destination: String
})

function sendToDestination() {
    // console.log(router.currentRoute.value)
    emit('closeOverlays')
    router.push({name: props.destination})
}

</script>
  
<style>
.box {
    height: 37px;
    width: 192px;
    margin: auto;
    margin-top: 2em;
}

.box .overlap-group {
    background: var(--Naranja-fondo, #EA662D);
    border-radius: 9px;
    height: 37px;
    position: relative;
    width: 192px;
    justify-content: space-around;
}

.box .text-big {
    color: var(--Blanquito-hueso, #F4E8D9);
    font-family: "Inter", Helvetica;
    font-size: 24px;
    font-weight: 600;
    height: 29px;
    left: 54px;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    text-align: center;
    top: 4px;
    width: 88px;
}

.box .text-small {
    color: var(--Blanquito-hueso, #F4E8D9);
    font-family: "Inter", Helvetica;
    font-size: 22px;
    font-weight: 600;
    height: 29px;
    left: 54px;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    text-align: center;
    top: 4px;
    width: 88px;
}

.box .mando-icono {
    height: 34px;
    width: auto;
    left: 11px;
    object-fit: cover;
    position: absolute;
    margin-top: 0px;
    top:2px;
    margin-bottom: 0px;
    /* width: 34px; */
}
</style>
  