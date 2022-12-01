<template>
    <div class="side-indicator">
        <input type="checkbox" @change="toggleSelected($event)" />
    </div>
</template>
  
<script>
import { eventBus } from '../../services/event-bus.service.js'
export default {

    name: "side-indicator",
    props: {
        taskId: String,

    },
    data() {
        return {
            selectedTasks: []
        }
    },
    created(){
        eventBus.on('selectedTasks',this.setSelectedTasks)
    },
    methods: {
        toggleSelected(ev) {
            const isSelected = ev.target.checked
            const isTaskInCollection = this.selectedTasks.some(t => t === this.taskId)
            //when selected and not in the selectedTasks
            if (isSelected && !isTaskInCollection) {
                eventBus.emit('addTaskIdToCollection', this.taskId)
            }
            //when omit and in collection
            if (!isSelected && isTaskInCollection) {
                eventBus.emit('removeTaskIdFromCollection', this.taskId)
            }
        },
        setSelectedTasks(selectedTasks){
            this.selectedTasks=selectedTasks
        }

    }
};
</script>
  
