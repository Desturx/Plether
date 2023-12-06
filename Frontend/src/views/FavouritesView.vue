<template>
    <!-- <h1>Juegos</h1>
    <div v-for="(item, index) in test" :key="index">
        {{ item.name }}
        {{ item.age }}
    </div> -->
    <div class="page-parent">
        <div class="title-games">
            <h1>Favoritos</h1>
        </div>
        <div class="games">
            <GameItemComponent 
            imgSrc="src/assets/games/atomic-heart.jpg">

            </GameItemComponent>

            <GameItemComponent
            imgSrc="src/assets/games/armored-core-6.jpg">

            </GameItemComponent>

            <GameItemComponent
            imgSrc="src/assets/games/digimon survive.jpg">

            </GameItemComponent>

            <GameItemComponent
            imgSrc="src/assets/games/armored-core-6.jpg">

            </GameItemComponent>
        </div>

    </div>


</template>


<script setup>

    // import GameItemComponent from './GameItemComponent.vue';
    import GameItemComponent from '../components/viewComponents/GameItemComponent.vue';
    // const test = [{
    //     name: "alex",
    //     age: "22",
    //     mail: "alex@mail.com"
    // },
    // {
    //     name: "mar",
    //     age: "22",
    //     mail: "mar@mail.com"
    // }]
</script>

<style scoped>
.title-games {
    margin-top: 1.5em;
    margin-bottom: 1.5em;
    & h1 {
        text-align: center;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        color: var(--blanquito-hueso);
    }
}


.page-parent {
    /* background-color: blue; */
    
}
.games {
    /* background-color: green; */
    max-height: 34em;
    height: 40em;
    overflow-y: auto;
}

</style>