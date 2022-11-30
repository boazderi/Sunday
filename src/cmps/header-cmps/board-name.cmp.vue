<template>
  <section class="flex items-center">
    <el-tooltip content="Click to edit">
      <h1 class="board-name-title el-tooltip__trigger" contenteditable>
        Sprint 4
      </h1>
    </el-tooltip>
    <el-tooltip content="Show board description">
      <button class="icon outboard-hover" v-icon="'info'"></button>
    </el-tooltip>
    <el-tooltip content="Add to favorites ">
      <button class="icon outboard-hover"
      v-icon="'star'"
      >

      </button>
    </el-tooltip>
  </section>
</template>

<script lang="ts" setup></script>
