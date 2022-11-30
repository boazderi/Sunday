<template>
  <!-- todo change handle the hovering that will cover and not push -->
  <section :class="getClass">

    <button class="toggleWorkSpace" @click="toggleWorkspace">to</button>

    <div class="dropdown-nav-header flex space-between align-center">
      <span>workspace</span>
      <div v-icon="'moreMed'"></div>
    </div>

    <!-- todo make a work on the select element -->
    <div class="workspace-dropdown flex align-center space-between">
      
        <div class="home flex align-center">
          <span class="logo-text flex center align-center">M</span>
          <span class="logo" v-icon="'homeSmall'"></span>
          <span class="text">Main workspace</span>
        </div>

      <div class="flex align-center" v-icon="'arrowDown'"></div>
     
    </div>

    <section class="action-list flex column">
      <div class="flex align-center item">
        <div class="flex align-center" v-icon="'addMed'"></div>
        Add
      </div>
      <div class="flex align-center item">
        <div class="flex align-center" v-icon="'filterMed'"></div>
        Filters
      </div>
      <div class="flex align-center item">
        <div class="flex align-center" v-icon="'searchMed'"></div>
        Search
      </div>

    </section>

    <!-- board-list -->
    <section v-if="(boards.length)" class="">

      <ul class="clean-list board-list">
        <li @click="setBoard(board._id)" v-for="board in boards" :key="board._id">
          <div class="item flex align-center">
            <span class="flex align-center" v-icon="'folderIcon'"></span>
            <span>{{ board.title }}</span>
          </div>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>

export default {
  data() {
    return {
      isOpen: true,
      actionList: ['add', 'filter', 'search']
    }
  },
  created() {

  },
  methods: {
    toggleWorkspace() {
      console.log('baba')
      this.isOpen = !this.isOpen;
    },
    setBoard(boardId) {

      this.$store.commit({ type: 'setCurrBoard', boardId })
      this.$router.push(`/board/${boardId}/main-table`)
    }
  },
  computed: {
    boards() {
      return this.$store.getters.getBoards
    },
    getClass() {
      return ` ${this.isOpen ? 'isOpen' : ''} workspace flex column`
    }

  }
}

</script>

<style>

</style>