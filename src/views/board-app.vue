<template>

  <section class="board-app">
    <side-nav />
    <workspace />
    <board-header />
    <section class="board-content">
      <router-view></router-view>
    </section>
  </section>

</template>


<script>
import sideNav from '../cmps/side-nav.vue'
import workspace from '../cmps/workspace.vue'
import boardHeader from '../cmps/header-cmps/board-header.vue'


export default {
  data() {
    return {

    }
  },
  components: {
    sideNav,
    workspace,
    boardHeader
  }

}

</script>
