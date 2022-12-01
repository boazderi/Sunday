<template>
    <section class="bottom-crud flex align-center">
        <button @click="onDuplicateTasks">Duplicate</button>
        <button @click="onRemoveTasks">Delete</button>
    
    </section>
</template>

<script>

export default {
methods:{
    onRemoveTasks(){
        this.$emit('removeTasks')
    },
    onDuplicateTasks(){
        this.$emit('duplicateTasks')
    }
}
}
</script>

<style>

</style>