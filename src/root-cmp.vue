<template>
  <section>
    <user-msg/>
    <!-- remove app header -->
    <!-- <app-header /> -->
    
    <!-- home-page component here -->
    <router-view/>
  </section>
</template>

<script>


import { store } from './store/store'
import appHeader from './cmps/app-header.vue'
import userMsg from './cmps/user-msg.vue'
import { userService } from './services/user.service'
import homePage from './views/home-page.vue'

export default {

  created() {
    console.log('Vue App created')
    const user = userService.getLoggedinUser()
    if (user)  store.commit({type: 'setLoggedinUser', user})
  },
  components: {
    // appHeader,
    userMsg,
    homePage
  },
}
</script>