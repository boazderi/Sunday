<template>

  <section class="board-app">

    <side-nav></side-nav>
    <workspace></workspace>
    <board-container></board-container>
   
  </section>

</template>


<script >
import sideNav from '../cmps/side-nav.vue'
import workspace from '../cmps/workspace.vue'
import boardContainer from '../cmps/board-container.vue'


export default {
  data() {
    return {

    }
  },
  components: {
    sideNav,
    workspace,
    boardContainer

  }

}

</script>
