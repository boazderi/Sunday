<template>
  <section class="board-header main-layout">
    <div class="board-upper-header flex flex-col">
      <div class="flex justify-between">
        <board-name></board-name>
        <header-top-actions></header-top-actions>
      </div>
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
import boardFilter from "./board-filter.cmp.vue";
import headerTopActions from "./header-top-actions.cmp.vue"
export default {
  components: {
    boardName,
    boardNav,
    boardFilter,
    headerTopActions,
  },
  data() {
    return {
      currBoardName: "",
    };
  },
};
</script>
