<template>
    <section class="bottom-crud flex align-center space-between">
        <div v-if="selectedTasks"  class="selected-counter flex align-center center">{{ length }}</div>
        <div class="flex align-center sub-wrapper">
            <button @click="onDuplicateTasks">
                <span class="svg flex column" v-icon="'duplicate'"></span>
                Duplicate
            </button>
            <button class="flex column align-center center" @click="onRemoveTasks">
                <span class="svg " v-icon="'garbage'"></span>
                Delete
            </button>
            <!-- todo work on closing functionallity -->
            <span class="svg close" v-icon="'x'"></span>
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
        }
    }
}
</script>
