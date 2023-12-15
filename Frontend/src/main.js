import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { OhVueIcon, addIcons } from "oh-vue-icons";

import { 
    FaEye, FaEyeSlash, MdModeeditoutline,
    MdEditoffRound, HiChatAlt2, BiTrashFill,
    FaPlus, FaUserFriends, MdCheckRound,
    MdCloseRound, IoNotifications, RiArrowGoBackFill,
    MdStaroutlineTwotone, MdStar 
} from "oh-vue-icons/icons"

const app = createApp(App)

// defineIonPhaser(window);

app.use(router)
addIcons(
    FaEye, FaEyeSlash, MdModeeditoutline,
    MdEditoffRound, HiChatAlt2, BiTrashFill,
    FaPlus, FaUserFriends, MdCheckRound,
    MdCloseRound, IoNotifications, RiArrowGoBackFill,
    MdStaroutlineTwotone, MdStar 
)

addIcons({
    name: 'swords',
    width: 24,
    height: 24,
    paths: [
        {

            d: 'M5 1.5L1 1L1.5 5L8 11L6 13L8.5 15.5L11 13L13.5 15.5L14.75 14.25L16 13L14 11L20.5 5L21 1L17 1.5L11 9L5 1.5Z'
        },
        {
            
            d: 'M13.5 18L18 13.5C18 13.5 19 13 19.5 13.5C20 14 19.5 15 19.5 15L18.3358 16.1642L21 19L19 21L16.2809 18.2191L15 19.5C15 19.5 14 20 13.5 19.5C13 19 13.5 18 13.5 18Z'
        },
        {
           
            d: 'M4.5 13.5L9 18C9 18 9.5 19 9 19.5C8.5 20 7.5 19.5 7.5 19.5L6.21907 18.2191L3.5 21L1.5 19L4.24675 16.2468L3 15C3 15 2.5 14 3 13.5C3.5 13 4.5 13.5 4.5 13.5Z'
        },
        {
            
            d: 'M16.2809 18.2191L19.5 15C19.5 15 20 14 19.5 13.5C19 13 18 13.5 18 13.5L13.5 18C13.5 18 13 19 13.5 19.5C14 20 15 19.5 15 19.5L16.2809 18.2191ZM16.2809 18.2191L19 21L21 19L18.3358 16.1642M18.5 21.5L21.5 18.5M6.21907 18.2191L3 15C3 15 2.5 14 3 13.5C3.5 13 4.5 13.5 4.5 13.5L9 18C9 18 9.5 19 9 19.5C8.5 20 7.5 19.5 7.5 19.5L6.21907 18.2191ZM6.21907 18.2191L3.5 21M3.5 21L1.5 19M3.5 21L4 21.5M1.5 19L4.24675 16.2468M1.5 19L1 18.5M1 1L5 1.5L11 9L17 1.5L21 1L20.5 5L14 11L16 13L14.75 14.25L13.5 15.5L11 13L8.5 15.5L6 13L8 11L1.5 5L1 1Z'
        }
    ]
})


app.component("v-icon", OhVueIcon)

app.mount('#app')


