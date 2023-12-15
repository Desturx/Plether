import { io } from 'socket.io-client'

const url = "http://localhost:3000";

export const socket = io(url, {debug: true, autoConnect: false})

export const messageTypes= {
    FRIEND_REQUEST: "friend-request",
    ACCEPT_FRIEND_REQUEST: "a-friend-request",
    DECLINE_FRIEND_REQUEST: "d-friend-request",
    CHALLENGE_REQUEST: "duel-request",
    DUEL_LOST: "duel-lost",
    DUEL_WON: "duel-won"
}


