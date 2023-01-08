<template>

  <section class="board-app">
    <side-nav />
    <workspace :class="{'active' : active === 'workspace'}"/>
    <board-header :class="{'active' : active === 'main-layout'}" />
    <section class="board-content">
      <router-view></router-view>
    </section>
  </section>

</template>

<script>
import sideNav from '../cmps/side-nav.vue'
import workspace from '../cmps/workspace.vue'
import boardHeader from '../cmps/header-cmps/board-header.vue'
import {eventBus} from '../services/event-bus.service'
import { socketService, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_LOAD_CURRBOARD } from "../services/socket.service.js"
import { boardService } from "../services/board.service.local.js"

export default {
  data(){
    return {
      active: 'workspace'
    }
  },
  created() {
    socketService.emit(SOCKET_EMIT_SET_TOPIC, this.$route.params.id)
    socketService.on(SOCKET_EVENT_LOAD_CURRBOARD, this.loadCurrBoard)
    eventBus.on('setCurrActive', this.setCurrActive)
  },
  methods: {
    setCurrActive(currActive){
      this.active = currActive
    },

    async loadCurrBoard(boardId) {
      const board = await boardService.getBoardById(boardId)

      this.$store.commit({
        type: 'setCurrBoardBySocket',
        board
      })
    },
  },
  components: {
    sideNav,
    workspace,
    boardHeader
  }

}

</script>
