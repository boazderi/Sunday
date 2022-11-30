<template>
  <div v-if="board" class="app-container">
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  margin: 0;
  height: 100vh;
}

.app-container {
  height: 100%;
  /* background: red; */
}

.group-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
