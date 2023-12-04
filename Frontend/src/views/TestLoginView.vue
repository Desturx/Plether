<template>
  <div class="email-form">
     <h2>Email</h2>
     <input type="text" placeholder="nombre@email.com" />
     <h2>Contraseña</h2>
     <input type="password" placeholder="***" />
     <button>Entrar</button>
     <p>¿Has olvidado la contraseña? Regístrate</p>
  </div>
 </template>
 
 <script>
 export default {
  name: "EmailForm",
 };
 </script>
 
 <style scoped>
 .email-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
 }
 
 h2 {
  margin: 10px 0;
 }
 
 input {
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
 }
 
 button {
  padding: 10px 20px;
  margin: 10px 0;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
 }
 
 button:hover {
  background-color: #0056b3;
 }
 
 p {
  text-align: center;
  margin-top: 20px;
 }
 </style>