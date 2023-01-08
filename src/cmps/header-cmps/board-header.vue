<template>
  <section class="board-header main-layout">
    <div class="board-upper-header flex flex-col">
      <div class="sub-upper-header flex ">
        <div class="back-to-workspace" @click="backToWorkspace()"> <img src="https://cdn-icons-png.flaticon.com/512/2099/2099166.png" alt=""> </div>
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
import {eventBus} from '../../services/event-bus.service'

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
  methods: {
    backToWorkspace(){
      eventBus.emit('setCurrActive' ,'workspace')
    }
  }
};
</script>
