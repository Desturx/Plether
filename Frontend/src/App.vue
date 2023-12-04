<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { computed, ref } from 'vue'

import OverlayHamburguesa from './components/HamburguerMenu.vue'
import NotifyMenu from './components/NotificationsMenu.vue'
import ChallengesMenu from './components/ChallengesMenu.vue'


const showOverlayIzq = ref(false);
const showOverlayDer1 = ref(false);
const showOverlayDer2 = ref(false);


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
</script>

<template>
  <header>
    <div class="logo">
      <img style="width: 300px;" alt="Plether logo" src="@/assets/logo.png" >
    </div>
    
    <nav class="navigation">
      <div :class="buttonChangeColor" id="hamburguer" @click="changeShow('izq', !showOverlayIzq)">
        <!-- <p>HAM</p> -->
        <!-- <img alt="Hamburguer icon" src="@/assets/hamIcon.svg" width="125" height="125" /> -->
        <img alt="Hamburguer icon" src="@/assets/svgs/hamIcon.svg" />

      </div>

      <RouterLink to="/login">
        <div>
          <img alt="Hamburguer icon" src="@/assets/svgs/personIcon.svg" />
        </div>
      </RouterLink>

      <div :class="button3ChangeColor" @click="changeShow('der2', !showOverlayDer2)">
        <img alt="Hamburguer icon" src="@/assets/svgs/notifyIcon.svg" />
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
  <OverlayHamburguesa v-if="showOverlayIzq" />
  <NotifyMenu v-if="showOverlayDer2"/>
  <ChallengesMenu v-if="showOverlayDer1"/>
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

