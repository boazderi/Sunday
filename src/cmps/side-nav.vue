<template>
  <section class="side-nav flex column align-center">

    <div class="monday-icon flex center " @click="onNavToHomePage">
      <img class="flex center" src="../../src/assets/img/monday_logo_icon.png" width="30" height="30" alt="">
    </div>


    <div class="work-management flex align-center center">
      <span v-icon="'workManagement'"></span>
    </div>


    <section class="icons-pattern1 flex column align-center">
      <div class="icon-wrapper" v-for="icon in pattern1Icons" :key="icon">
        <span class="svg" v-icon="icon"></span>
      </div>
    </section>

    <section class="icons-pattern2 flex column align-center">
      <div class="icon-wrapper" v-for="icon in pattern2Icons" :key="icon">
        <span class="svg" v-icon="icon"></span>
      </div>
    </section>

    <section class="bottom-icons flex column align-center">
      <div class="bottom-icon-wrapper flex center align-center">
        <span class="svg" v-icon="'ninePoints'"></span>
      </div>

      <div class="member-wrapper flex align-center center">
        <member-preview :member="loggedUser"></member-preview>

      </div>

    </section>

    <!-- todo add user preview with img -->

  </section>
</template>

<script>
import memberPreview from './member-preview.vue'

export default {
  data() {
    return {
      // todo make the loggedin reactive
      loggedInUser: this.$store.getters.loggedinUser,
      pattern1Icons: ['notifications', 'inbox', 'myWork', 'sideStar'],
      pattern2Icons: ['apps', 'sideInvite', 'sideSearch', 'help']
    }
  },
  methods: {
    onNavToHomePage() {
      this.$router.push('/')
    }
  },
  computed: {
    loggedUser() {
      return this.$store.getters.loggedinUser
    }
  },
  components: {
    memberPreview
  }
}
</script>

<style>

</style>