<template>
  <main>
  <!-- <h1>Juegos</h1>
  <div v-for="(item, index) in test" :key="index">
      {{ item.name }}
      {{ item.age }}
  </div> -->
  <div class="page-parent">
      <div class="title-games">
          <h1>Juegos</h1>
      </div>
      <div class="games">
          <GameItemComponent 
          imgSrc="src/assets/games/atomic-heart.jpg"
          @click="gotoComponent('234')">

          </GameItemComponent>

          <GameItemComponent
          imgSrc="src/assets/games/armored-core-6.jpg">

          </GameItemComponent>

          <GameItemComponent
          imgSrc="src/assets/games/digimon survive.jpg">

          </GameItemComponent>

          <GameItemComponent
          imgSrc="src/assets/games/armored-core-6.jpg">

          </GameItemComponent>
      </div>

  </div>

</main>
</template>


<script setup>

  // import GameItemComponent from '/GameItemComponent.vue';
  import GameItemComponent from '../components/viewComponents/GameItemComponent.vue'
  import { useRouter } from 'vue-router';
  const router = useRouter();


  function gotoComponent(gameId) {
    router.push({path: '/games/'+ gameId})
  }

  // import { socket } from '@/socket'
  // import { store } from '@/store/store'

  // function test() {
  //   const data = {
  //     // userId: store.id,
  //     userId: "656c6a56108f62d5a3f0e7f9",
  //     message: 'YEEPEEEE'
  //   }
  //   socket.emit('notification created', data)
  // }
</script>

<style scoped>
.title-games {
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  & h1 {
      text-align: center;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 600;
      color: var(--blanquito-hueso);
  }
}


.page-parent {
  /* background-color: blue; */
  
}
.games {
  /* background-color: green; */
  max-height: 34em;
  height: 40em;
  overflow-y: auto;
}

</style>