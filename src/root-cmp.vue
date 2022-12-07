<template>
  <section>
    <user-msg />

    <router-view />
  </section>
</template>

<script>

import userMsg from './cmps/user-msg.vue'
import homePage from './views/home-page.vue'

export default {

  async created() {
    console.log('root-cmp created')
    this.$store.dispatch({ type: 'loadBoards' })
    this.$store.dispatch({ type: 'loadUsers' })

  },
  components: {
    userMsg,
    homePage
  },
}
</script>