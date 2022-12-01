<template>
  <div v-if="board" class="main-table main-layout">
    <!-- TODO add main layout to group-list -->
    <section class="group-list">
      <group v-for="(group, idx) in board.groups" :key="idx" :groupInfo="group" />
    </section>
  </div>
</template>

<script>

import group from "../cmps/boardCmp/group.vue"

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