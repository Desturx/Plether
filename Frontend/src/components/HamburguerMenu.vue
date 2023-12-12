<script setup>
import Button from './buttons/OverlayButtonItem.vue'

const emit = defineEmits(['closeOverlays'])
</script>


<template>
    <div class="overlay-background">
        <div class="overlay">
            <div class="buttons-container">

                <Button @close-overlays="emit('closeOverlays')"
                textClass="text-big" 
                text="Juegos" 
                img-src="icono-mando.png"
                destination="home" />
                <Button @close-overlays="emit('closeOverlays')"
                textClass="text-big" 
                text="Amigos" 
                img-src="icono-personas.png"
                destination="friends" />
                <Button @close-overlays="emit('closeOverlays')"
                textClass="text-big" 
                text="Favoritos" 
                img-src="icono-favoritos.png"
                destination="favourites" />

                <Button @close-overlays="emit('closeOverlays')"
                class="info-button"
                textClass="text-small"
                text="Información" 
                img-src="icono-about.png"
                destination="" />
                
            </div>
        </div>
    </div>
</template>



<style scoped>
.info-button {
    position: absolute; 
    bottom: 2em;
    margin: auto;
    left: 3.44em;
}
.overlay-background {
    height: 100%;
    width: 100%;
    max-width: 430px;
    position: fixed;
    background: rgba(51, 47, 51, 0.50);    
}
.overlay {
    position: fixed;
    height: 83%;
    max-width: 301px;
    width: 70%;
    background-color: #F4E8D9;
    opacity: 100%;
    border-bottom-right-radius: 1.2em;
    border-top-right-radius: 1.2em;
}

.buttons-container {
    margin-top: 3em;
    height: 100%;
}

</style>
