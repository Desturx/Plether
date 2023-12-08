<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { computed, onMounted, ref, watch} from 'vue'
import OverlayHamburguesa from './components/HamburguerMenu.vue'
import NotifyMenu from './components/NotificationsMenu.vue'
import ChallengesMenu from './components/ChallengesMenu.vue'
// import { onMounted } from 'vue'
// import { io } from 'socket.io-client'
import { socket } from '@/socket'
import { store } from '@/store/store'

onMounted(()=>{
    // const socket = io('http://localhost:3000')

    if(store.id !== "") {
      console.log("se ha emitido el join room")
      socket.connect();
    }
    
    socket.on('connect', ()=>{
      console.log('Connected to server')
    })


    socket.on('disconnect', ()=> {
      console.log('Disconnected from the server')
    })

    socket.on('notification created', async (notification) => {
      console.log('Notification Received: ', notification);
      reloadNotis.value = !reloadNotis.value
      // if(notification.message===messageTypes.FRIEND_REQUEST){
        //TO-DO: Ver si mando un toast o un snackbar para que se pueda ver
      // } 
    });

})

watch(
  ()=> store.id,
  (newId, oldId)=>{
    console.log('old id is: ', oldId)
    console.log('new id is: ', newId)
    socket.connect();
    socket.emit('join room', newId)
    // abandonar la room anterior, unirse a la nueva
  }
)

// watch(store, (newStore)=>{
//   socket.emit('join room', newStore.id)
// })




const showOverlayIzq = ref(false);
const showOverlayDer1 = ref(false);
const showOverlayDer2 = ref(false);
const reloadNotis = ref(false)

const buttonChangeColor = computed(() => ({
  active: showOverlayIzq.value
}))

const button2ChangeColor = computed(() => ({
  active: showOverlayDer1.value
}))

const button3ChangeColor = computed(() => ({
  active: showOverlayDer2.value
}))


const changeShow = (pos, newValue) => {
  if(pos === 'izq') {
    showOverlayIzq.value = newValue

    if(showOverlayDer1.value || showOverlayDer2.value) {
      if(showOverlayDer2.value) showOverlayDer2.value = false
      if(showOverlayDer1.value) showOverlayDer1.value = false
    }

  } else if(pos === 'der1') {
    showOverlayDer1.value = newValue

    if(showOverlayDer2.value || showOverlayIzq.value) {
      if(showOverlayDer2.value) showOverlayDer2.value = false
      if(showOverlayIzq.value) showOverlayIzq.value = false
    }
    
  } else if(pos === 'der2') {
    showOverlayDer2.value = newValue

    if(showOverlayDer1.value || showOverlayIzq.value) {
      if(showOverlayDer1.value) showOverlayDer1.value = false
      if(showOverlayIzq.value) showOverlayIzq.value = false
    }
  }
}

function disableOverlays() {
  showOverlayDer1.value = false;
  showOverlayDer2.value = false;
  showOverlayIzq.value = false;
}



</script>

<template>
  <header>
    <div class="logo">
      <img style="width: 300px;" alt="Plether logo" src="@/assets/logo.png" >
    </div>
    
    <!-- <nav class="navigation" v-if="state.isUserLoggedIn" > -->
    <nav class="navigation" v-if="$route.meta.navbar" >
      <div :class="buttonChangeColor" id="hamburguer" @click="changeShow('izq', !showOverlayIzq)">
        <img alt="Hamburguer icon" src="@/assets/svgs/hamIcon.svg" />

      </div>

      <RouterLink to="/profile" @click="disableOverlays">
        <div>
          <img alt="Hamburguer icon" src="@/assets/svgs/personIcon.svg" />
        </div>
      </RouterLink>

      <div :class="button3ChangeColor" @click="changeShow('der2', !showOverlayDer2)">
        <img alt="Hamburguer icon" src="@/assets/svgs/notifyIcon.svg" />
        <!-- <v-icon fill="#1A191B" scale="1.3" name="io-notifications" /> -->

      </div>
      <div :class="button2ChangeColor" @click="changeShow('der1', !showOverlayDer1)">
        <img alt="Challenges icon" src="@/assets/svgs/challengeIcon.svg" />
      </div>
      <!-- <div><RouterLink to="/">HOME</RouterLink></div>
      <div><RouterLink to="/">HOME</RouterLink></div>
      <div><RouterLink to="/">HOME</RouterLink></div> -->
    </nav>

  </header>

  <!-- Overlays -->
  <OverlayHamburguesa v-if="showOverlayIzq" @close-overlays="disableOverlays"/>
  <NotifyMenu v-if="showOverlayDer2" :key="reloadNotis"> </NotifyMenu>
  <ChallengesMenu v-if="showOverlayDer1" />
  
  <RouterView />

</template>


<style scoped>
#hamburguer {
  float: left;
  text-align: center;
  display: grid;
  place-items: center;
}
.active {
  background-color: #F4E8D9;
  border-top-left-radius: 15%;
  border-top-right-radius: 15%;
}

</style>

