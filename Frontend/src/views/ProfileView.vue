<template>
  <div class="profile">
    <div> 
      <h3 placeholder="edit me" :class="changeClass()" :contenteditable="editUsername" class> {{ store.username }}</h3>
      <!-- <input :readonly="!editUsername" v-model="store.username" :class="changeClass()" type="text"/> -->
      <span @click="editUsername = !editUsername" class="icon-holder">
        <v-icon v-if="!editUsername" scale="1.3" name="md-modeeditoutline" class="pencil" />
        <v-icon v-else scale="1.3" name="md-editoff-round" class="pencil" />
      </span>
      <!-- MdModeeditoutline, MdEditoffRound -->
      
    </div>

    <div id="userImg">
      <img style="width: 120px;" src="@/assets/svgs/profileIcon.svg" alt="" />
    </div>

    <div style="max-width: fit-content;">
      <h3>{{ store.mail }}</h3>
      <!-- <v-icon  scale="1.3" name="fa-pencil-alt" class="pencil" /> -->
    </div>

    <div style="max-width: fit-content;">
      <button style="
      max-width: fit-content;
      width:100%;
      margin-top: 0px;
      padding: 5px;" 
      class="btn-submit">Cambiar contraseña</button>
    </div>
    
  </div>
</template>

<script setup>
// import axios from 'axios'
import { ref } from 'vue'
import { store } from '../store/store.js'

const editUsername = ref(false);
// const editMail = ref(false);

function changeClass() {
  if(editUsername.value) {
    return 'editable'
  } else {
    return 'notEditable'
  }
}



</script>


<style scoped>

.icon-holder {
  display: grid;
  place-items: center;
}
.notEditable {
  color: var(--blanquito-hueso);
  padding: 8px 0;
  font-family: "Inter-Regular", Helvetica;
  font-size: 20px;
  margin-right: 0.3em;
  border: none;
  /* background: transparent; */
  text-align: center;
}
.notEditable:focus {
  outline: none;
}


.editable {
  color: var(--blanquito-hueso);
  padding: 8px 0;
  font-family: "Inter-Regular", Helvetica;
  font-size: 20px;
  margin-right: 0.3em;
  max-width: fit-content;
  /* background: transparent; */
  border: 2px solid var(--blanquito-hueso);
  width: auto;
  height: auto;
  min-width: 100px;

}


#userImg {
  /* background-color: blue; */
  width: 178px;
  height: 178px;
  max-width: 50%;
  border-radius: 100%;
  border: 4px solid var(--blanquito-hueso);
}

.profile {
  /* background-color: blue; */
  display: flex;
  flex-direction: column;
  font-family: "Inter-Regular", Helvetica;
  color: var(--blanquito-hueso);
  & div {
    display: flex;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1em;
    margin-bottom: 1em;
    max-width: 50%;
    /* background-color: yellow; */
    /* & h3 {
      color: var(--blanquito-hueso);
      padding: 8px 0;
      font-family: "Inter-Regular", Helvetica;
      font-size: 20px;
      margin-right: 0.3em;
    } */
  }
}

.pencil {
  margin-top: auto;
  margin-bottom: auto;
}
</style>
