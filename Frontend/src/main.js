import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaEye, FaEyeSlash, MdModeeditoutline, MdEditoffRound } from "oh-vue-icons/icons"

const app = createApp(App)

app.use(router)
addIcons(FaEye, FaEyeSlash, MdModeeditoutline, MdEditoffRound )

app.component("v-icon", OhVueIcon)

app.mount('#app')
