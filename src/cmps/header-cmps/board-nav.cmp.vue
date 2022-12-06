<template>
  <section class="flex board-nav-container">
    <div class="board-nav-item active flex outboard-hover" @click="onNavToMainTable" >
      <span v-icon="'mainTable'"></span> Main table</div>
    <div class="views-seprator"></div>

    <el-tooltip content="Kanban">
      <div class="board-nav-item flex outboard-hover" @click="onNavToKanban">
        Kanban</div>
    </el-tooltip>
    <div class="views-seprator"></div>
    <el-tooltip content="Dashboard">
      <div class="board-nav-item flex outboard-hover" @click="onNavToDashboard">
        Dashboard</div>
    </el-tooltip>
    <div class="views-seprator"></div>
    <el-tooltip content="Add View">
      <router-link class="board-nav-item flex outboard-hover" to="/">
        <span v-icon="'addSmall'"></span> </router-link>
    </el-tooltip>
  </section>
</template>

<script>
export default {
  data() {
    return {
      boardId: ''
    }
  },
  created() {
    this.boardId = this.$route.params.id
  },
  methods: {
    onNavToKanban() {
      this.$router.push(`/board/${this.boardId}/kanban`)
    },
    onNavToMainTable(){
      this.$router.push(`/board/${this.boardId}/main-table`)
    },
    onNavToDashboard(){
      this.$router.push(`/board/${this.boardId}/dashboard`)
    }
  }
}
</script>
