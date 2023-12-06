<template>
    <div class="overlay-background">
        <div class="overlay">
            <!-- <h2>SE APARECE EL OVERLAY DE NOTIFICACIONES</h2> -->
            <div class="item" v-for="(notification, index) in notifications" :key="index" :notification="notification">
                <div class="item-top">
                    <v-icon fill="#f4e8d9" scale="2" :name="notification.iconName" />
                    <p> {{ notification.senderName }} {{ notification.title }} </p>
                    <v-icon v-if="notification.showTrash" fill="#f4e8d9" scale="1.4" name="bi-trash-fill" />
                </div>
                <div class="item-bottom">
                    <v-icon fill="#f4e8d9" scale="2" name="md-check-round" />
                    <v-icon fill="#f4e8d9" scale="2" name="md-close-round" />
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios';
import { store } from '@/store/store'
import { messageTypes } from '@/socket'

const notifications = ref([])

onMounted(()=>{
    getNotifications()
})

// TO-DO: Hacer que se puedan aceptar o rechazar las solicitudes de alguna manera
async function getNotifications() {
    console.log(store.id)
    const url="http://localhost:5000/api/notifications/" + store.id;
    console.log('la url: ', url)
    await axios.get(url, {withCredentials: true})
    .then((res)=>{
        console.log(res)

        res.data.forEach(element => {
            // If the notifications are friend requests add some parameters to display them properly
            if(element.message === messageTypes.FRIEND_REQUEST) {
                element.title =" quiere ser tu amigo"
                element.iconName="fa-user-friends"
                element.showTrash= false;
            }
        });


        notifications.value = res.data
    })
    .catch( (err)=>{
        console.log(err)
    })
}


async function acceptFriendRequest() {
    // TO-DO: para aceptar, hay que enviar la solicitud a aceptar friend request y luego eliminar la notificacion
    // de la ruta de notificaciones.
}

</script>

<style scoped>

.item {
    width:75%;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1em;
    margin-top: 1em;
    background-color: var(--naranja);
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;

}

.item-top {
    display: flex;

    & p {
        margin-top: 0.2em;
        margin-left: 0.4em;
        margin-right: 0.2em;
        text-align: left;
        color: var(--blanquito-hueso);
        font-family: 'Inter';
        font-size: 1.2rem;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }
}

.item-bottom {
    display: flex;
    justify-content: space-around;
    padding: 10px;
}
.overlay-background {
    height: 100%;
    width: 100%;
    position: fixed;
    background: rgba(51, 47, 51, 0.50);    
}
.overlay {
    position: fixed;
    right: 0%;
    height: 83%;
    width: 70%;
    background-color: #F4E8D9;
    opacity: 100%;
    border-top-left-radius: 1.2em;
    border-bottom-left-radius: 1.2em;
    /* border-bottom-right-radius: 1.2em;
    border-top-right-radius: 1.2em; */
}
</style>
