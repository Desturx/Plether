// import { reactive } from 'vue'
// export const state = reactive({
    //     connected: false,
    //     Notification: [],
    //     barEvents: []
    // })
    
// var socket = io.connect('http://localhost:3000', { query: 'userId=' + userId });
// export const socket = io(url, {query: 'userId=' + store.id, debug: true, autoConnect: false});

// import { store } from '@/store/store'
import { io } from 'socket.io-client'

const url = "http://localhost:3000";

export const socket = io(url, {debug: true, autoConnect: false})

export const messageTypes= {
    FRIEND_REQUEST: "friend-request",
    ACCEPT_FRIEND_REQUEST: "a-friend-request",
    DECLINE_FRIEND_REQUEST: "",
    NEW_FRIEND: ""
}


