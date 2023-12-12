<template>
    <slot>

    </slot>
</template>

<script setup>

</script>

<style scoped>
.item {
    background-color: var(--naranja);
    display: flex;
    justify-content: space-around;
    width: 89%;
    margin-right: auto;
    margin-left: auto;
    margin-top: 1em;
    border-radius: 10px;
    padding-top: 8px;
    padding-bottom: 8px;
    color: var(--blanquito-hueso);
    font-family: 'Inter';
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

}

.user {
    & img {
        width: 4em;
        border: 2px solid var(--blanquito-hueso);
        border-radius: 100px;
        padding: 4px;
    }
    & p {
        text-align: center;
    }
}

.versus {
    display: flex;
    flex-direction: column;
    
    & img {

        width: 2em;
        
    }
    & p {
        text-align: center;
        font-size: 1rem;
        font-style: italic;
        font-weight: 700;
        line-height: normal;
    }

    & button {
        margin-top: 1.2em;
        width: 4.3em;
        height: 1.6em;
        border: 2px solid var(--blanquito-hueso);
        border-radius: 10px;
        background-color: var(--naranja);
        color: var(--blanquito-hueso);
    }
}

.enemy {
    & img {
        width: 4em;
        border: 2px solid var(--blanquito-hueso);
        border-radius: 100px;
        padding: 4px;
    }
    & p {
        text-align: center;
    }
}
</style>