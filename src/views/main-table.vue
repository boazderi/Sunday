<template>
  <section v-if="board" class="main-table ">
    <section class="group-list">
      <group v-for="(group, idx) in board.groups" :key="idx" :groupInfo="group"
        @updateSelectedTasks="updateSelectedTasks" />

      <div class="new-group-btn flex align-center space-even">
        <span class="svg" v-icon="'add'"></span>
        <button @click="onAddGroup">Add new group</button>
      </div>
    </section>

    <bottom-crud v-if="selectedTasks.length" :selectedTasks="selectedTasks" @removeTasks="removeTasks"
      @duplicateTasks="duplicateTasks" />
  </section>
  <!-- taskConversation -->
  <router-view></router-view>
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
    eventBus.on('setAllTaskInContext', this.setAllTaskInContext)
  },
  methods: {
    async removeTasks() {
      await this.$store.dispatch({
        type: 'removeTasks',
        payload: { selectedTasks: this.selectedTasks }
      })
      this.selectedTasks = []

    },
    async duplicateTasks() {
      await this.$store.dispatch({
        type: 'duplicateTasks',
        payload: { selectedTasks: this.selectedTasks }
      })
      this.selectedTasks = []
      // TODO- make all inputs checked=false in the side cmps
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
    },
    setAllTaskInContext({ tasks, isSelected }) {
      this.selectedTasks = []
      if (isSelected) tasks.forEach(t => this.selectedTasks.push(t.id))
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
  emits: ["updateSelectedTasks"]
}
</script>