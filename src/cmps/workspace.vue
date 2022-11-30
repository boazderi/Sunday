<template>
  <!-- todo change handle the hovering that will cover and not push -->
  <section class="workspace" :class="{ isOpen: isOpen }">
    <button class="toggle" @click="toggleWorkspace">to</button>

    <section v-if="(boards.length)" class="details">
      <ul class="clean-list">
        <li @click="setBoard(board._id)" v-for="board in boards" :key="board._id">
          <h2>{{ board.title }}</h2>
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
    }
  }
}

</script>

<style>

</style>