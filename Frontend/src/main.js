import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { OhVueIcon, addIcons } from "oh-vue-icons";

import { 
    FaEye, FaEyeSlash, MdModeeditoutline,
    MdEditoffRound, HiChatAlt2, BiTrashFill,
    FaPlus, FaUserFriends, MdCheckRound,
    MdCloseRound, IoNotifications
} from "oh-vue-icons/icons"

const app = createApp(App)

app.use(router)
addIcons(
    FaEye, FaEyeSlash, MdModeeditoutline,
    MdEditoffRound, HiChatAlt2, BiTrashFill,
    FaPlus, FaUserFriends, MdCheckRound,
    MdCloseRound, IoNotifications 
)

app.component("v-icon", OhVueIcon)

app.mount('#app')
