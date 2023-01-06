<template>
  <section class="board-header main-layout">
    <div class="board-upper-header flex flex-col">

      <div class="sub-upper-header flex ">
        <board-name />
        <header-top-actions />
      </div>

      <board-nav />
    </div>
    
    <div>
      <board-filter-bar />
    </div>
  </section>
</template>

<script>
import boardName from "./board-name.cmp.vue";
import boardNav from "./board-nav.cmp.vue";
import boardFilterBar from "./board-filter-bar.cmp.vue";
import headerTopActions from "./header-top-actions.cmp.vue"

export default {
  components: {
    boardName,
    boardNav,
    boardFilterBar,
    headerTopActions,
  },
  data() {
    return {
      currBoardName: "",
    };
  },
};
</script>
