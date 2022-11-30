<template>
  <section
  class="board-filter flex"
  ><div class="flex new-task">
      <button class="new-task-btn"> New Task </button>
      <button class="new-task-arrow" style="{color: white}" v-icon="'arrowDown'"></button>
  </div>
    <button class="flex align-center board-filter-item outboard-hover"><span v-icon="'search'"></span> Search </button>
    <button class="flex align-center board-filter-item outboard-hover"> <span v-icon="'person'"></span> Person </button>
    <button class="flex align-center board-filter-item outboard-hover"><span v-icon="'filter'"></span> Filter </button>
    <button class="flex align-center board-filter-item outboard-hover"><span v-icon="'sort'"></span> Sort </button>
    <button class="flex align-center board-filter-item outboard-hover"><span v-icon="'hide'"></span> Hide </button>
  </section>
</template>

<script>
export default {

}
</script>

<style>

</style>