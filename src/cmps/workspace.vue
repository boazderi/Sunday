<template>
  <section :class="getClass">

    <div class="toggleWorkspace flex  align-center" @click="toggleWorkspace">
      <span v-if="isOpen" class="svg first" v-icon="'arrowLeft'"></span>
      <span class="svg second" v-else v-icon="'arrowRight'"></span>
    </div>

    <div class="dropdown-nav-header flex space-between align-center">
      <span>Workspace</span>
      <div class="more-medium flex" v-icon="'moreMed'"></div>
    </div>

    <div class="workspace-dropdown flex align-center space-between">

      <div class="home flex align-center">
        <span class="logo-text flex center align-center">M</span>
        <span class="logo" v-icon="'homeSmall'"></span>
        <span class="text">Main workspace</span>
      </div>
      <div class="flex align-center" v-icon="'arrowDownBlack'"></div>
    </div>

    <section class="action-list flex column">
      <!-- action-list -->
      <div v-for="action in actionList" @click="onSetActionByTitle(action.title)"
        :class="['flex', 'align-center', 'item', action.title]" :key="action">
        <div class="flex align-center" v-icon="`${action.icon}`"></div>
        <span :class="action.icon"> {{ action.title }}</span>
      </div>
    </section>

    <!-- syntactic border -->
    <div class="lists-border flex center"></div>

    <!-- board-list -->
    <section v-if="(boards.length)" class="fully">
      <ul class="clean-list board-list fully">
        <li class="list-item flex space-between" @click="setBoard(board._id)" v-for="(board, idx) in boards" :key="board._id"
         :class="{'active-item': this.activeBoardId === board._id || idx === 0 && !this.activeBoardId}">
          <div class="board-item flex align-center" >
            <span class="flex align-center" v-icon="'folderIcon'"></span>
            <span>{{ board.title }}</span>
          </div>
          <div class="workspace-more-action flex align-center" @click.stop.prevent="openDeleteModal(board._id)">
            <div v-icon="'moreMed'"></div>
          </div>
          <div class="delete-modal flex align-center" :class="{'open': this.moreAction === board._id}"
           @click.stop="removeBoard(board._id)"
           v-click-outside-element="closeDeleteModal">
            <div class="flex align-center" v-icon="'deleteGrp'"></div>
            <div>Delete</div>
          </div>
        </li>
      </ul>
    </section>
    <footer class="workspace-footer">
        <router-link class="workspace-bottom-link" to="/">
          <div class="home-icon"> <img src="https://cdn-icons-png.flaticon.com/512/2550/2550264.png" width="40" alt=""> </div>
          <div> Home </div>
        </router-link>
        <div class="workspace-bottom-link" @click="mobileGoToMAinTable"> 
          <div class="main-table-icon"> <img src="https://cdn-icons-png.flaticon.com/512/3286/3286768.png" alt=""> </div>
           <div>Main table</div>
        </div>
    </footer>
  </section>
</template>

<script>


import {eventBus} from '../services/event-bus.service'

export default {
  data() {
    return {
      isOpen: true,
      activeBoardId: '',
      actionList: [
        { title: 'Add', icon: 'add' },
        { title: 'Filter', icon: 'filter' },
        { title: 'Search', icon: 'search' },
      ],
      moreAction: ''
    }
  },
  created() {
    this.activeBoardId = this.$route.params.id
  },
  methods: {
    toggleWorkspace() {
      this.isOpen = !this.isOpen;
    },
    setBoard(boardId) {
      this.activeBoardId = boardId

      this.$store.commit({ type: 'setCurrBoard', boardId })
      this.$router.push(`/board/${boardId}/main-table`)
      eventBus.emit('setCurrActive', 'main-layout')
    },
    onSetActionByTitle(title) {
      if (title === 'Add') {
        this.$store.dispatch({ type: 'addBoard' })
      }
    },
    mobileGoToMAinTable(){
            eventBus.emit('setCurrActive', 'main-layout')
    },
    openDeleteModal(boardId){
      if(this.moreAction === boardId) this.moreAction = ''
      else this.moreAction = boardId
    },
    closeDeleteModal(){
      this.moreAction = ''
    },
    removeBoard(boardId) {
      this.$store.dispatch({ type: 'removeBoard', boardId })
    }
  },
  computed: {
    boards() {
      return this.$store.getters.getBoards
    },
    getClass() {
      return ` ${this.isOpen ? 'isOpen' : ''} workspace flex column`
    },
    actionListItem() {

    },
    arrowSide() {
      if (this.isOpen) return 'arrowLeft'
      return 'arrowRight'
    }

  }
}

</script>

<style>

</style>