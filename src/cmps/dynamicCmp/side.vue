<template>
    <div class="side-indicator">
        <input type="checkbox" @change="toggleSelected($event)" />
    </div>
</template>
  
<script>
export default {
    name: "side-indicator",
    props: {
        taskId: String,
        selectedTasks: Array
    },

    methods: {
        toggleSelected(ev) {
            const isSelected = ev.target.checked
            const isTaskInCollection = this.selectedTasks.some(t => t === this.taskId)
            //when selected and not in the selectedTasks
            if (isSelected && !isTaskInCollection) {
                this.$emit('addTaskIdToCollection', this.taskId)
            }
            //when omit and in collection
            if(!isSelected&&isTaskInCollection){
                this.$emit('removeTaskIdFromCollection',this.taskId)
            }

        }
    }
};
</script>
  
