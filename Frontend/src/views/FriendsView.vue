<template>
    <main>
        <div class="page-parent">
            <div class="title">
               <h1>Amigos</h1>
            </div>
            <!-- <div class="friend-list">
                <FriendComponent name="user1"/>
                <FriendComponent name="user2"/>
                <FriendComponent name="user3"/>
                <FriendComponent name="user4"/>
                <FriendComponent name="user5"/>
                <FriendComponent name="user6"/>
            </div> -->
            <div class="friend-list">
                <FriendComponent v-for="(friend, index) in friends" :key="index" :friend="friend"
                :name="friend.name" @delete-friend="deleteFriend(friend)"/>
            </div>
            
            <div class="btn-holder">
                <button @click="showModal = true" class="btn-submit">
                <v-icon  scale="1.3" name="fa-plus" class="icon" />
                <p>Nuevo amigo</p>
                </button>
            </div>

            <TestModal v-model:show="showModal">
                <p>Introduce el email</p>
                <input v-model="friendMail" type="text" name="">
                <button @click="sendRequest">Enviar</button>
            </TestModal>

        </div>
    </main>
</template>

<script setup>
import axios from 'axios';
import TestModal from '../components/modals/modalcomponent.vue'
import FriendComponent from '../components/viewComponents/FriendComponent.vue'
import { store } from '../store/store.js'
import { ref, onMounted } from 'vue'
import { socket, messageTypes } from '@/socket'

const friends = ref([]);
const showModal = ref(false)
const friendMail = ref('')



onMounted(()=>{
    getFriends();

    socket.on('accept friend request', (data)=>{
        console.log('Friend request accepted', data)
        getFriends();
    })
    

})

async function sendRequest() {
    const mail = friendMail.value
    showModal.value = false
    // console.log(friendMail.value)
    // http://localhost:5000/api/users/friend-request ->friend request
    // 1- petición a la lista de amigos de usuarios
    var url = 'http://localhost:5000/api/users/friend-request'
    await axios.post(url, {
        mail: store.mail,
        friendMail: mail
    }, { withCredentials: true })
        .then((res) => {
            console.log(res)
            // console.log("FriendID: " + friendID)
            
            socket.emit('notification created', {
                recieverId: res.data._id,
                senderId: store.id,
                senderName: store.username,
                message: messageTypes.FRIEND_REQUEST
            })
            
        })
        .catch((err) => {
            console.log(err)
            console.log(err.response.data._message)
        })

}

async function getFriends() {
    const url="http://localhost:5000/api/users/friends/" + store.id;

    await axios.get(url, {withCredentials: true})
    .then((res)=>{
        console.log(res)
        friends.value = res.data.friends
    })
    .catch( (err)=>{
        console.log(err)
    })
}

function deleteFriend(friend) {
    // console.log("testeando el friend: ", friend)
    const url="http://localhost:5000/api/users/delete-friend"
    axios.post(url, {
        userId: store.id,
        friendId: friend._id
    }, { withCredentials: true})
    .then((res)=>{
        if(res.status === 200){
            var index = friends.value.indexOf(friend)
            friends.value.splice(index, 1)
        }

    })
    .catch(()=>{

    })
}


</script>

<style scoped>

.btn-submit {
    width: fit-content;
    padding: 10px;
    display: flex;
    & p {
        text-align: center;
        margin-left: 5px;
        color: var(--blanquito-hueso);
        text-align: center;
        font-family: 'Inter';
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
    & v-icon {
        margin: auto;
    }
}
.btn-holder {
    display: grid;
    place-content: center;
}
.page-parent {
    /* background-color: blue; */
}

.title {
    margin-top: 1.5em;
    margin-bottom: 1.5em;

    & h1 {
        text-align: center;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        color: var(--blanquito-hueso);
    }
}

.friend-list {
    max-height: 30em;
    overflow-y: auto;
}
</style>