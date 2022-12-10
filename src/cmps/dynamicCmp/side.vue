<template>
    <div class="side flex align-center center sticky">
        <input :checked="false" ref="checkbox" class="checkbox" type="checkbox" @change="toggleSelected($event)" />
    </div>
</template>
  
<script>
import { eventBus } from '../../services/event-bus.service.js'
export default {

    name: "side",
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
        eventBus.on('turnOffAllCheckbox', this.turnOffAllCheckbox)

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
        turnOffAllCheckbox() {
            this.$refs.checkbox.checked = false
        },
        toggleCheckbox({ groupId, isSelected }) {
            if (groupId === this.groupId) {
                if (!isSelected) this.$refs.checkbox.checked = false
                else this.$refs.checkbox.checked = true
            }
        }

    }
};
</script>
  
