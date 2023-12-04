<template>
  <div class="profile">
    <div> 
      <h3>NOMBRE</h3>
      <v-icon scale="1.3" name="fa-pencil-alt" class="pencil" />
    </div>

    <div id="userImg">
      <img style="width: 120px;" src="@/assets/svgs/profileIcon.svg" alt="" />
    </div>

    <div style="max-width: fit-content;">
      <h3>alejandromerino@mail.com</h3>
      <v-icon scale="1.3" name="fa-pencil-alt" class="pencil" />
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

</script>

<style scoped>


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
    margin: auto;
    margin-top: 1em;
    margin-bottom: 1em;
    max-width: 50%;
    /* background-color: yellow; */
    & h3 {
      color: var(--blanquito-hueso);
      
      padding: 8px 0;
      font-family: "Inter-Regular", Helvetica;
      font-size: 20px;
      margin-right: 0.3em;
    }
  }
}

.pencil {
  margin-top: auto;
  margin-bottom: auto;
}
</style>
