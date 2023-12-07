// import { io } from 'socket.io-client'

// import { store } from '@/store/store'

// const url = "http://localhost:3000";
// var socket = io.connect('http://localhost:3000', { query: 'userId=' + userId });

// export const socket = io(url, {query: 'userId=' + store.id, autoConnect: false});
// export const socket = io(url, {query: 'userId=' + store.id});

import { io } from 'socket.io-client'
import { reactive } from 'vue'






class SocketIoService {

    
    socket;
    constructor() {}

    setupSocketConnection(userId) {
        this.socket = io("http://localhost:3000", {query: 'userId=' + userId} )
        console.log("se conecta con el id de usuario: ", userId)
    }
    
    disconnect(){
        if(this.socket) {
            this.socket.disconnect();
        }
    }

    getSocket() {
        return this.socket   
    }
}

export const messageTypes= {
    FRIEND_REQUEST: "friend-request",
    ACCEPT_FRIEND_REQUEST: "a-friend-request",
    DECLINE_FRIEND_REQUEST: "",
    NEW_FRIEND: ""
}

export default new SocketIoService();


