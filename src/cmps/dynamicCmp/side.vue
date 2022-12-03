<template>
    <div class="side-indicator">
        <input :checked="false" ref="checkbox" class="checkbox" type="checkbox" @change="toggleSelected($event)" />
    </div>
</template>
  
<script>
import { eventBus } from '../../services/event-bus.service.js'
export default {

    name: "side-indicator",
    props: {
        taskId: String,
        color: String,
        groupId: String
    },
    data() {
        return {
            selectedTasks: [],
        }
    },
    created() {
        eventBus.on('selectedTasks', this.setSelectedTasks)
        eventBus.on('toggleAllTasksCheckbox', this.toggleCheckbox)
    },
    methods: {
        toggleSelected(ev) {
            const isSelected = ev.target.checked
            const isTaskInCollection = this.selectedTasks.some(t => t === this.taskId)
            //when selected and not in the selectedTasks
            if (isSelected && !isTaskInCollection) {
                eventBus.emit('addTaskIdToCollection', this.taskId)
            }
            //when omit and exist selectedTasks
            if (!isSelected && isTaskInCollection) {
                eventBus.emit('removeTaskIdFromCollection', this.taskId)
            }
        },
        setSelectedTasks(selectedTasks) {
            this.selectedTasks = selectedTasks
        },
        toggleCheckbox(gId) {
            if (gId === this.groupId && this.$refs.checkbox) {
                this.$refs.checkbox.checked = !this.$refs.checkbox.checked
            }
        }

    }
};
</script>
  
