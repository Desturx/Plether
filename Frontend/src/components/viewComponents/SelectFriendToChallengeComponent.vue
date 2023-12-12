<template>
        <!-- <div class="top-icons">
            <v-icon fill="#f4e8d9" scale="2" @click="router.go(-1)" name="ri-arrow-go-back-fill"  />
        </div> -->
    <div class="content">
        <h2>Desafiar a...</h2>
        <div id="friends">
            <div class="friend" v-for="(friend, index) in friends" :key="index" @click="$emit('startDuel', friend)">
                <img src="/src/assets/svgs/personIcon.svg" alt="">
                <h2>{{ friend.name }}</h2>
            </div>

            <!-- <div class="friend">
                <img src="/src/assets/svgs/personIcon.svg" alt="" >
                <h2>Pepito</h2>
            </div> -->
            

        </div>
    </div>
</template>

<script setup>
defineProps(['friends'])

</script>

<style scoped>

.page-parent {

}

.top-icons {
    margin: 1.5em 
}

.content {
    & h2 {
        color: var(--blanquito-hueso);
        text-align: center;
        font-family: "Inter";
        font-size: 2.5rem;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }
}

#friends {
    margin-top: 1em;
    margin-left: auto;
    margin-right: auto;
    /* background-color: aquamarine; */
    width: 85%;
    /* height: 30em; */
    height: 100%;
    max-height: 30em;
    overflow-y: auto;
}

.friend {
    background-color: var(--blanquito-hueso);
    height: fit-content;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    padding: 8px 0;
    margin-bottom: 1.4em;
    & img {
        margin-left: 1em;
        width: 3em;
        min-width: 3em;
    }

    & h2 {
        margin-right: auto;
        padding: 5px 0;
        color: var(--casi-negro);
        font-family: "Inter";
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
}
</style>