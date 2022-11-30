<template>
  <section class="board-header">
    <div class="board-upper-header">
      <board-name></board-name>
      <board-nav></board-nav>
    </div>
    <div class="board-lower-header">many small parts</div>
  </section>
</template>
<script>
import boardName from "./board-name.cmp.vue";
import boardNav from "./board-nav.cmp.vue";
export default {
    components: {
        boardName,
        boardNav,
    },
  data() {
    return {
      currBoardName: "",
    };
  },
};
</script>
