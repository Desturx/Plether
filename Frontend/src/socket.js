// import { reactive } from 'vue'
import { io } from 'socket.io-client'
// export const state = reactive({
//     connected: false,
//     Notification: [],
//     barEvents: []
// })
import { store } from '@/store/store'

const url = "http://localhost:3000";
// var socket = io.connect('http://localhost:3000', { query: 'userId=' + userId });

export const socket = io(url, {query: 'userId=' + store.id});



