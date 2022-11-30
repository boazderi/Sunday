<template>
  <div v-if="board" class="main-table-container">
    <div class="group-container">
      <group v-for="(group, idx) in board.groups" :key="idx" :groupInfo="group" />
    </div>
  </div>
</template>

<script>

import group from "../cmps/group.vue"

export default {
  name: "App",

  computed: {
    board() {
      return this.$store.getters.getCurrBoard
    }
  },
  components: {
    group,
  },
};
</script>