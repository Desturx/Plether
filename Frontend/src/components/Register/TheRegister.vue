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
                <input class="form-input" v-model="password" placeholder="edit me" />
            </div>

            <div>
                <p>Repetir contraseña</p>
                <input v-model="passwordCheck" placeholder="edit me" />
            </div>

            <div>
                <button class="btn-submit">submit</button>
            </div>


                
        </form>

    </div>


    <TestModal v-model:show="showModal">
        <p>{{  message }}</p>
    </TestModal>

    <!-- <button @click="showModal = true">Open</button> -->

</template>

<script setup>
// import TestModal from '../modals/ModalTest.vue'
import TestModal from '../modals/ModalComponent.vue'
import axios from 'axios';
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();
// ------

const message = ref('')
const showModal = ref(false);
const username = ref('')
const mail = ref('')
const password = ref('')
const passwordCheck = ref('')


async function registerUser() {
    const url="http://localhost:5000/api/users"
    console.log("ESTA REGISTRANDOSE")
    // const res = await axios.get(url)
    // console.log(res.data)
    var body = new FormData();
    body.append('name', username.value)
    body.append('mail', mail.value)
    body.append('password', password.value)

    await axios.post(url, {
        name: username.value,
        mail: mail.value,
        password: password.value
    }, {withCredentials: true})
    .then((res)=>{
        console.log(res)
        if(res.status === 200) {
            sessionStorage.logged = true;
            router.push({name: 'about'})
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



.btn-submit {
  align-self: center;
  width: 8em;
  height: 2em;
}
.register {
  margin-top: 1.5em;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  background-color: red;

  & div {
    margin-top: 1em;
    margin-bottom: 1em;
    margin-left: auto;
    margin-right: auto;
    color: white;
    font-size: 22px;
    width: fit-content;
   
    & input {
      height: 2em;
      margin: auto;
    }
  }
}
</style>

