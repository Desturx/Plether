<template>
  <div class="register">
      <form @submit.prevent="registerUser" >
          <div class="form-part">
              <p>Usuario</p>
              <input v-model="username" placeholder="Introduce tu nombre de usuario" />
          </div>
          <div>
              <p>Email</p>
              <input v-model="mail" placeholder="edit me" />
          </div>
      
          <div>
              <p>Contraseña</p>
              <input v-if="showPassword"  name="passwordShow" v-model="password"  placeholder="password" />
              <input v-else type="password"  name="passwordHide" v-model="password"  placeholder="password" />
              <span @click="showPassword = !showPassword">
                <v-icon scale="2" v-if="showPassword" name="fa-eye" />
                <v-icon scale="2" v-else name="fa-eye-slash"/>
              </span>
          </div>

          <!-- <div>
              <p>Repetir contraseña</p>
              <input v-model="passwordCheck" placeholder="edit me" />
          </div> -->

          <div>
              <button class="btn-submit">submit</button>
          </div>

          <div>
              <RouterLink to="/login">
                <p class="text">¿Ya tienes cuenta? Inicia sesión</p>
              </RouterLink>
          </div>
              
      </form>

  </div>

<!-- 
  <TestModal v-model:show="showModal">
      <p>{{  message }}</p>
  </TestModal> -->

  <!-- <button @click="showModal = true">Open</button> -->

</template>

<script setup>
// import TestModal from '../modals/ModalTest.vue'
// import TestModal from '../components/modals/ModalComponent.vue'
import axios from 'axios';
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router';
import { store } from '../store/store.js'
const router = useRouter();
// ------

const message = ref('')
const showModal = ref(false);
const username = ref('')
const mail = ref('')
const password = ref('')
const showPassword = ref(false);
const passwordCheck = ref('')


async function registerUser() {
  const url="http://localhost:5000/api/users"
  // console.log("ESTA REGISTRANDOSE")
  // const res = await axios.get(url)
  // console.log(res.data)
  // var body = new FormData();
  // body.append('name', username.value)
  // body.append('mail', mail.value)
  // body.append('password', password.value)

  await axios.post(url, {
      name: username.value,
      mail: mail.value,
      password: password.value
  }, {withCredentials: true})
  .then((res)=>{
      console.log(res)
      if(res.status === 200) {
          sessionStorage.logged = true;
          store.setId(res.data._id)
          store.setMail(res.data.mail)
          store.setUsername(res.data.name)
          router.push({name: 'home'})
      }
  })
  .catch((err) => {
      console.log(err)
      console.log(err.response.data._message)
  })
}


// COMPROBAR QUE LAS CONTRASEÑAS SON IGUALES
watch(passwordCheck, (newPass)=> {
  if(newPass === password.value) {
      console.log("son iguales")
  } else {
      console.log("no son iguales")
  }
})
</script>



<style scoped>

.text {
  color: var(--Blanquito-hueso, #F4E8D9);
  text-align: center;
  font-family: Inter;
  font-size: 0.875rem;
  font-style: italic;
  font-weight: 100;
  line-height: normal;
}

.btn-submit {
  align-self: center;
  width: 8em;
  height: 3em;
  margin-top: 2em;
  color: #F4E8D9;
  background-color: #07A4C2;
  border-radius: 0.3em;
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  cursor: pointer;
}
.btn-submit:hover,
.btn-submit:focus {
  background-color: #09839b;
}

.register {
margin-top: 20%;
margin-left: auto;
margin-right: auto;

& div {
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: auto;
  margin-right: auto;
  font-size: 22px;
  width: fit-content;
  color: #F4E8D9;
  font-family: Inter;
  font-size: 1.3em;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: relative;

  & span {
      position: absolute;
      top: 42%;
      left:102%;
  }
  & input {
      height: 2.3em;
      margin: auto;
      background-color: #F4E8D9;
      color: #1A191B;
      font-family: Inter;
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      border-radius: 0.3em;
  }
}
}
</style>


