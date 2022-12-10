<template>
  <section class="flex items-center">
    <el-tooltip transition="none" auto-close=0 content="Click to edit">
      <h1 class="board-name-title el-tooltip__trigger" contenteditable @blur="onChangeBoardTitle">
        {{ currBoard.title }}
      </h1>
    </el-tooltip>
    <el-tooltip transition="none" auto-close=0 content="Show board description">
      <button class="icon outboard-hover board-name-icon" v-icon="'info'"></button>
    </el-tooltip>
    <el-tooltip transition="none" auto-close=0 content="Add to favorites ">
      <button class="icon outboard-hover board-name-icon" v-icon="'star'"></button>
    </el-tooltip>
  </section>
</template>

<script>
export default {
  computed: {
    currBoard() {
      return this.$store.getters.getCurrBoard
    }
  },
  methods: {
    onChangeBoardTitle(ev) {
      this.$store.dispatch({
        type: 'updateCurrBoard',
        prop: 'title', toUpdate: ev.target.innerText
      })
    }
  }

}
</script>
