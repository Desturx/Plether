<template>
    <Teleport to="#modal-container">
    <div v-if="show" class="modal">
        <div class="modal-content">
            <slot />
            <button @click="close(this)">Close</button>
        </div>
    </div>
    </Teleport>
</template>

<script setup>
defineProps({
    show: Boolean
})

function close(e) {
    e.$emit('update:show', false)
}



</script>

<style scoped>
  .modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
   }
   
   .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
   }
</style>