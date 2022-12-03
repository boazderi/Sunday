<template>
  <section v-if="board" class="main-table ">
    <section class="group-list">
      <group v-for="(group, idx) in board.groups" :key="idx" :groupInfo="group"
        @updateSelectedTasks="updateSelectedTasks" />
        <div class="flex align-center new-group">
      <button @click="onAddGroup">Add new group</button>
    </div>
    </section>
    <bottom-crud v-if="selectedTasks.length" @removeTasks="removeTasks" @duplicateTasks="duplicateTasks" />

   
  </section>


</template>

<script>

import group from "../cmps/boardCmp/group.vue"
import bottomCrud from "../cmps/boardCmp/bottom-crud.vue"
import { eventBus } from "../services/event-bus.service.js"
import draggable from "vuedraggable";

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
      // TODO- make all inputs checked=false in the side cmps
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
    onAddGroup() {
      this.$store.dispatch({ type: 'addGroup' })
    }

  },
  computed: {
    board() {
      return this.$store.getters.getCurrBoard
    }
  },
  watch: {
    selectedTasks: {
      handler() {
        eventBus.emit('selectedTasks', this.selectedTasks)
      },
      deep: true
    }
  },
  components: {
    group,
    bottomCrud,
    draggable,
  },

};
</script>