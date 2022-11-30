<template>
  <section>
    <user-msg />

    <!--//todo remove app header -->
    <!-- home-page component here -->
    <router-view />
  </section>
</template>

<script>


import { store } from './store/store'
import userMsg from './cmps/user-msg.vue'
import { userService } from './services/user.service'
import homePage from './views/home-page.vue'

export default {

  created() {
    console.log('Vue App created')
    this.$store.dispatch({ type: 'loadBoards' })
    const user = userService.getLoggedinUser()
    if (user) store.commit({ type: 'setLoggedinUser', user })
  },
  components: {
    // appHeader,
    userMsg,
    homePage
  },
}
</script>