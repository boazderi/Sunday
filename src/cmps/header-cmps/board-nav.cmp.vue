<template>
  <section class="flex board-nav-container">
    <router-link class="board-nav-item active flex outboard-hover" to="/">
      <span v-icon="'mainTable'"></span> Main table</router-link
    >
    <div class="views-seprator"></div>

    <el-tooltip content="Kanban">
      <router-link class="board-nav-item flex outboard-hover" to="/">
        Kanban</router-link
      >
    </el-tooltip>
    <div class="views-seprator"></div>
    <el-tooltip content="Dashboard">
      <router-link class="board-nav-item flex outboard-hover" to="/">
        Dashboard</router-link
      >
    </el-tooltip>
  </section>
</template>

<script>
</script>
