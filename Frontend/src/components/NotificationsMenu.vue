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
                <div class="item-bottom" v-if="notification.showAcceptDecline">
                    <v-icon fill="#f4e8d9" scale="2" name="md-check-round"  @click="acceptFriendRequest(notification)"/>
                    <v-icon fill="#f4e8d9" scale="2" name="md-close-round" @click="declineFriendRequest(notification)"/>
                </div>
                <div v-else>
                    <p>{{ notification.others[0] }} - {{ notification.senderName }}</p>
                    <p>{{  notification.others[1] }} - tu </p>
                    
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios';
import { store } from '@/store/store'
import { messageTypes, socket } from '@/socket'

// TO-DO: refactorizar el codigo para hacer que todas las páginas que contengan peticiones a la api tengan esta constante
const API = "http://localhost:5000/api"

const notifications = ref([])

onMounted(()=>{

    console.log("NOTIFICACIONES DE DUELOS: ", store.duelNotifications)

    getNotifications()

})

async function getNotifications() {
    console.log(store.id)
    const url= API + "/notifications/" + store.id;
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
                element.showAcceptDecline = true;
            }
            
            if(element.message === messageTypes.DUEL_LOST) {
                element.title = " te ha ganado"
                element.iconName = "swords"
                element.showTrash = true;
                element.showAcceptDecline = false;
            }
        });


        notifications.value = res.data

    })
    .catch( (err)=>{
        console.log(err)
    })
}

function test(notification) {

    // var index = notifications.value.findIndex(notification)
    var index2 = notifications.value.indexOf(notification)
    // console.log("el index1 es: ", index )
    console.log("el index2 es: ", index2 )
}

async function acceptFriendRequest(notification) {
    // first we send a petition to get the friend requests
    var url= API + "/users/friend-request/" + store.id
    let found = null;
    
    await axios.get(url, {withCredentials: true})
    .then((res)=>{
        // console.log("lo que saca del server")
        if(res.status === 200) { // we check the status code is "OK"
            console.log(res);
            // we get the friend request related to button pressed when the function was called
            found = res.data.friendRequests.find((element)=>{
                return element.name === notification.senderName
            })
        }
    })
    .catch((err)=>{
        console.log(err)
    })

    var deleteNotification

    url= API + "/users/accept-request"
    // now we send a notification to accept the friend request
    await axios.post(url, {
        userId: store.id,
        requestId: found._id,
    }, {withCredentials:true})
    .then((res)=>{
        // TO-DO: ver que se hace cuando la petición es correcta.
        // console.log('lo nuevo')
        if(res.status === 200) {
            deleteNotification = true
            socket.emit('accept friend request', { 
                recieverId: res.data._id,
                senderId: store.id,
                senderName: store.username,
                message: messageTypes.ACCEPT_FRIEND_REQUEST
            })
        }
    })
    .catch((err)=>{
        console.log(err)
    })


    url = API + "/notifications/" + notification._id
    if(deleteNotification) {
        await axios.delete(url, {withCredentials:true})
        .then((res)=>{
            console.log(res);
            var index = notifications.value.indexOf(notification)

            notifications.value.splice(index, 1)
        })
        .catch((err)=>{
            console.log(err);
        })
    }

}


async function declineFriendRequest(notification) {
    
    var url= API + "/users/friend-request/" + store.id
    let found = null;
    
    await axios.get(url, {withCredentials: true})
    .then((res)=>{
        // console.log("lo que saca del server")
        if(res.status === 200) { // we check the status code is "OK"
            console.log(res);
            // we get the friend request related to button pressed when the function was called
            found = res.data.friendRequests.find((element)=>{
                return element.name === notification.senderName
            })
        }
    })
    .catch((err)=>{
        console.log(err)
    })


    var deleteNotification = false
    url= API + "/users/decline-request"
    await axios.post(url, {
        userId: store.id,
        requestId: found._id
    }, {withCredentials: true})
    .then((res)=>{
        if(res.status === 200) {
            deleteNotification = true
            // TO-DO: se podría mandar un evento con el socket para decir que se ha rechazado.
        }
    })
    .catch((err)=>{
        console.log(err)
    })



    if(deleteNotification) {
        url = API + "/notifications/" + notification._id
        await axios.delete(url, {withCredentials:true})
        .then((res)=>{
            console.log(res);
            var index = notifications.value.indexOf(notification)

            notifications.value.splice(index, 1)
        })
        .catch((err)=>{
            console.log(err);
        })
    }


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
    position: absolute;
    background: rgba(51, 47, 51, 0.50);    
}
.overlay {
    position: absolute;
    left: 129px;
    max-width: 301px;
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
