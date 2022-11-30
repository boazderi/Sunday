<template>
  <section class="main-layout">
    <board-header></board-header>
    <section class="board-content">

      <router-view></router-view>
    </section>
  </section>
</template>

<script>
import boardHeader from './board-header.vue'

export default {
  components: {
    boardHeader
  }
}
</script>

<style>

</style>