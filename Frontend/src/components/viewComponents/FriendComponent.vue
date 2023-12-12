<template>
    <div class="item">
        <div class="profile-icon">
            <img src="@/assets/svgs/personIcon.svg" alt="">
        </div>
        <div class="content">
            <h3>{{ name }}</h3>
            <div class="icons">
                <v-icon scale="2" name="hi-chat-alt-2" class="icon" />
                <v-icon scale="2" name="bi-trash-fill" class="icon" @click="$emit('deleteFriend')" />
            </div>
        </div>
    </div>
</template>

<script setup>
// const props = defineProps({
//     name: String
// })
defineProps({
    name: String
})


</script>

<style scoped>
.item {
    display: flex;
    background-color: var(--blanquito-hueso);
    border-radius: 10px;
    width: 70%;
    margin: auto;
    margin-bottom: 2em;
    height: fit-content;
}
    .profile-icon {
        display: grid;
        place-content: center;
        width: fit-content;
        height: fit-content;
        & img {
            width: 5em;
        }
    }

.content {
    width: 65%;
    margin-right: auto;
    & h3 {
        margin-top: 0.2em;
        text-align: center;
        color: var(--casi-negro);
        font-family: 'Inter';
        font-size: 1.25rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
}

    .icons {
        /* background-color: blueviolet; */
        margin: auto;
        margin-top: 10%;
        width: 100%;
        display: flex;
        justify-content: space-around;

    }



</style>