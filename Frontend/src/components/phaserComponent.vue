<template>
    <div id="phaser-game"></div>
</template>

<script>
import Phaser from 'phaser';

export default {
    mounted() {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'phaser-game',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 300 },
                    debug: false
                }
            },
            scene: this.$root.$options.phaserGame
        };

        this.$root.$options.phaser = new Phaser.Game(config);
    },

    beforeUnmount() {
        this.$root.$options.phaser.destroy(true);
    }
}
</script>