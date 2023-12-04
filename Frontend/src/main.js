import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaEye, FaEyeSlash, FaPencilAlt } from "oh-vue-icons/icons"

const app = createApp(App)

app.use(router)
addIcons(FaEye, FaEyeSlash, FaPencilAlt )

app.component("v-icon", OhVueIcon)

app.mount('#app')
