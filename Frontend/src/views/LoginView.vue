<template>
    <div class="login">
      <form @submit.prevent="test" >
            <div class="form-part">
                <p>Email</p>
                <input v-model="mail" placeholder="user@mail.com" />
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
            
            <div>
              <button class="btn-submit">Entrar</button>
            </div>

            <div>
                <RouterLink to="/register">
                  <p class="text">¿No tienes cuenta? Regístrate</p>
                </RouterLink>
            </div>
          </form>
    </div>
  </template>
  
<script setup>
import axios from 'axios';
import { ref } from 'vue'
import { useRouter } from 'vue-router';


const router = useRouter();

const showPassword = ref(false)
const mail = ref('')
const password = ref('')


async function test() {
  const url="http://localhost:5000/api/users/login"

  await axios.post(url, {
        mail: mail.value,
        password: password.value
    }, {withCredentials: true})
    .then((res)=>{
        console.log(res)
        if(res.status === 200) {
            sessionStorage.logged = true;
            router.push({name: 'home'})
        }
    })
    .catch((err) => {
        console.log(err)
        // console.log(err.response.data._message)
        // err.data.
        // console.log(err)
    })
}


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

.button-1:hover,
.button-1:focus {
  background-color: #09839b;
}

.login {
  margin-top: 20%;
  margin-left: auto;
  margin-right: auto;
  /* width: 80%; */
  /* background-color: red; */
  

  & div {
    margin-top: 1em;
    margin-bottom: 1em;
    margin-left: auto;
    margin-right: auto;
    font-size: 22px;
    width: fit-content;
    color: var(--Blanquito-hueso, #F4E8D9);
    font-family: Inter;
    font-size: 1.3em;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    position:relative;
    /* position: relative; */

    & span {
      position: absolute;
      top: 42%;
      left:102%;
      
    }
    & input {
      height: 2.3em;
      margin: auto;
      background-color: #F4E8D9;
      color: var(--Casi-negro, #1A191B);
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