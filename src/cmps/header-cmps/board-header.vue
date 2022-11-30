<template>
  <section class="board-header">
    <div class="board-upper-header">
        <board-name-cmp></board-name-cmp>
    </div>
    <div class="board-lower-header"></div>
    <h1>board-header</h1>
  </section>
</template>
<script>
import boardNameCmp from './board-name.cmp.vue';
export default {
  components: { boardNameCmp },
  data() {
    return {
      currBoardName: "",
    };
  },
};
</script>
