<template>
    <div v-for="(color, idx) in colors" @click.prevent="changeColor(color)" :style="{ background: color }"
        className="color-icon" :key="idx"></div>
</template>
  
<script>
export default {
    name: "color-picker",
    data() {
        return {
            colors: ['#037f4c', '#00c875', '#9cd326', '#cab641', '#ffcb00', '#784bd1', '#a25ddc', '#0086c0', '#579bfc', '#66ccff', '#bb3354', '#e2445c', '#ff158a', '#ff5ac4', '#ff642e', '#fdab3d', '#7f5347', '#c4c4c4', '#808080']
        };
    },
    methods: {
        changeColor(color) {
            this.$emit('update', { toUpdate: color })
        }
    },
    emits: ["update"],
}
</script>