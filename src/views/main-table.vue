<template>
  <section v-if="board" class="main-table ">
    <section class="group-list">

      <Container orientation="vertical" @drop="onGroupDrop($event)" @drag-start="(e) => log('drag start', e)">
        <Draggable v-for="group in board.groups" :key="group.id">
          <group :groupInfo="group" />
        </Draggable>
      </Container>

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
import { Container, Draggable } from "vue3-smooth-dnd"

import { eventBus } from "../services/event-bus.service.js"

export default {
  name: "App",
  data() {
    return {
      selectedTasks: [],
      groups: []
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
    },
    log(...params) {
      console.log(...params)
    },
    onGroupDrop(dropResult) {
      this.groups = this.applyDrag(this.board.groups, dropResult)
      this.$store.dispatch({
        type: "updateDraggedItems",
        groupsToUpdate: this.groups
      })
    },
    applyDrag(arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult
      if (removedIndex === null && addedIndex === null) return arr

      const result = [...arr]
      let itemToAdd = payload

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0]
      }

      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd)
      }

      return result
    }
  },
  computed: {
    board() {
      return this.$store.getters.getCurrBoard
    },
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
    Draggable,
    Container,
  },
  emits: ["updateSelectedTasks"]
}
</script>