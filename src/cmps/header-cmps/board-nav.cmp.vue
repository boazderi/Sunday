<template>
  <section class="flex board-nav-container">
    <div class="nav-item-container"  :class="{'active' : active === 'main table'}">
      <el-tooltip content="Main table" transition="none" auto-close=0>
        <div class="board-nav-item main-table-nav flex outboard-hover" @click="onNavToMainTable">
          <span v-icon="'mainTable'"></span> Main Table
        </div>
      </el-tooltip>
      <div class="views-seprator"></div>
    </div>
    <div class="nav-item-container" :class="{'active' : active === 'kanban'}">
      <el-tooltip content="Kanban" transition="none" >
        <div class="board-nav-item flex outboard-hover" @click="onNavToKanban">
          Kanban
        </div>
      </el-tooltip>
      <div class="views-seprator"></div>
    </div>

    <div class="nav-item-container" :class="{'active' : active === 'dashboard'}">
      <el-tooltip transition="none" auto-close=0 content="Dashboard">
        <div
          class="board-nav-item flex outboard-hover"
          @click="onNavToDashboard"
        >
          Dashboard
        </div>
      </el-tooltip>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      boardId: "",
      active: 'main table',
    };
  },
  created() {
    this.boardId = this.$route.params.id;
  },
  methods: {
    onNavToKanban() {
      this.active = 'kanban'
      this.$router.push(`/board/${this.boardId}/kanban`);
    },
    onNavToMainTable() {
      this.active = 'main table'
      this.$router.push(`/board/${this.boardId}/main-table`);
    },
    onNavToDashboard() {
      this.active = 'dashboard'
      this.$router.push(`/board/${this.boardId}/dashboard`);
    },
  },
};
</script>
