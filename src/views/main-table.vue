<template>
  <div v-if="board" class="main-table-container">
    <section class="group-list">
      <group v-for="(group, idx) in board.groups" :key="idx" :groupInfo="group"
        @updateSelectedTasks="updateSelectedTasks" />
    </section>
    <bottom-crud v-if="selectedTasks.length" 
    @removeTasks="removeTasks" @duplicateTasks="duplicateTasks" />

  </div>
</template>

<script>

import group from "../cmps/boardCmp/group.vue"
import bottomCrud from "../cmps/boardCmp/bottom-crud.vue"
import { eventBus } from "../services/event-bus.service.js"

export default {
  name: "App",
  data() {
    return {
      selectedTasks: [],
    }
  },
  created() {
    eventBus.on('addTaskIdToCollection', this.addTaskIdToCollection)
    eventBus.on('removeTaskIdFromCollection', this.removeTaskIdFromCollection)
  },
  methods: {
    async removeTasks() {
      await this.$store.dispatch({
        type: 'removeTasks',
        payload: { selectedTasks: this.selectedTasks }
      })
      this.selectedTasks = []
      eventBus.emit('zeroingSelectedTasks')

    },
    async duplicateTasks() {
      await this.$store.dispatch({
        type: 'duplicateTasks',
        payload: { selectedTasks: this.selectedTasks }
      })
      this.selectedTasks = []
      eventBus.emit('zeroingSelectedTasks')
    },
    updateSelectedTasks(selectedTasks) {
      this.selectedTasks = selectedTasks
    },
    addTaskIdToCollection(taskId) {
      this.selectedTasks.push(taskId)
    },
    removeTaskIdFromCollection(taskId) {
      const idx = this.selectedTasks.findIndex(s => s.id === taskId)
      this.selectedTasks.splice(idx, 1)
    },
    
  },
  computed: {
    board() {
      return this.$store.getters.getCurrBoard
    }
  },
  watch: {
    selectedTasks: {
      handler() {
        eventBus.emit('setSelectedTasks', this.selectedTasks)
      },
      deep: true
    }
  },
  components: {
    group,
    bottomCrud
  },

};
</script>