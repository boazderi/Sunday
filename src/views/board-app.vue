<template>

  <section class="board-app">

    <side-nav></side-nav>
    <workspace></workspace>
    <board-header></board-header>
    <!-- todo figure out how to make the board-content routable -->
    <section class="main-content">
   
      <router-view></router-view>
    </section>
  </section>

</template>


<script>
import sideNav from '../cmps/side-nav.vue'
import workspace from '../cmps/workspace.vue'
import boardHeader from '../cmps/board-header.vue'
import mainTable from '../views/main-table.vue'

export default {
  data() {
    return {

    }
  },
  components: {
    sideNav,
    workspace,
    boardHeader,
    mainTable

  }

}

</script>
