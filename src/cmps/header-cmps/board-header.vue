<template>
  <section class="board-header">
    <div class="board-upper-header flex flex-col">
      <board-name></board-name>
      <board-nav></board-nav>
    </div>
    <div>
      <board-filter></board-filter>
    </div>
  </section>
</template>
<script>
import boardName from "./board-name.cmp.vue";
import boardNav from "./board-nav.cmp.vue";
import boardFilter from "./board-filter.cmp.vue"
export default {
    components: {
        boardName,
        boardNav,
        boardFilter,
    },
  data() {
    return {
      currBoardName: "",
    };
  },
};
</script>
