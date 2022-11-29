<template>
  <div class="app-container">
    <div class="group-container">
      <group></group>
      <group></group>
      <group></group>
    </div>
  </div>
</template>

<script>
import group from "../cmps/group.vue"
export default {
  name: "App",
  components: {
    group,
  },
};
</script>

<style>
body {
  /* margin: 0;
  height: 100vh; */
}

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
