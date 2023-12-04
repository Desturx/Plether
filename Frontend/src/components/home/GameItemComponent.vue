<template>
    <div class="item">
        <img :src="imgSrc" alt="">
        <!-- <p>juego1</p> -->
    </div>
</template>

<script setup>
defineProps({
    imgSrc: String
})
</script>

<style scoped>
.item {
    max-width: fit-content;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1em;
    /* background-color: yellow; */
    & img {
        width: 22em;
        /* background-size: contain; */
    }
}

</style>