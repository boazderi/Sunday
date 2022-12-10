<template>
    <section class="bottom-crud flex align-center space-between">
        <div class="sub1 flex align-center">
            <div v-if="selectedTasks"  class="selected-counter fully flex align-center center">{{ length }}</div>
            <div class="items-text">Items selected</div>
        </div>

        <div class="flex align-center sub2">
            <button @click="onDuplicateTasks">
                <span class="svg flex column" v-icon="'duplicate'"></span>
                Duplicate
            </button>
            <button class="flex column align-center center" @click="onRemoveTasks">
                <span class="svg " v-icon="'garbage'"></span>
                Delete
            </button>
        
            <span class="svg close" v-icon="'x'" @click="onCloseBottomCrud"></span>
        </div>

    </section>
</template>

<script>

export default {
    props: {
        selectedTasks: Array
    },
    computed: {
        length() {
            return this.selectedTasks.length
        }
    },
    methods: {
        onRemoveTasks() {
            this.$emit('removeTasks')
        },
        onDuplicateTasks() {
            this.$emit('duplicateTasks')
        },
        onCloseBottomCrud(){
            this.$emit('closeBottomCrud')
        }
    }
}
</script>
