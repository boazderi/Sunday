<template>
  <section>
    <user-msg />

    <router-view />
  </section>
</template>

<script>

import userMsg from './cmps/user-msg.vue'
import homePage from './views/home-page.vue'
import loginSignup from './views/login-signup.vue'

export default {

  async created() {
    this.$store.dispatch({ type: 'loadBoards' })
    this.$store.dispatch({ type: 'loadUsers' })
    
    this.$store.dispatch({
      type: 'login',
      userCred: { username: 'Guest', password: '123' }
    })
  },
  components: {
    userMsg,
    homePage,
    loginSignup
  },
}
</script>