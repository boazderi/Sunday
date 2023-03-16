<template>
  <section class="side-nav flex column align-center">
    <div class="monday-icon-wrapper">
      <div class="monday-icon flex center " @click="onNavToHomePage">
        <img class="flex center" src="../../src/assets/img/monday_logo_icon.png" width="30" height="30" alt="">
      </div>
    </div>

    <div class="workspace-arrow-left-div"> </div>
    <div class="work-management flex align-center center">
      <span v-icon="'workManagement'"></span>
    </div>

    <section class="icons-pattern1 flex column align-center">
    </section>

    <section class="bottom-icons flex column align-center">
      <div class="member-wrapper flex align-center center">
        <member-preview :member="loggedUser"></member-preview>

      </div>

    </section>


  </section>
</template>

<script>
import memberPreview from './member-preview.vue'

export default {
  data() {
    return {
      // todo make the loggedin reactive
      loggedInUser: this.$store.getters.loggedinUser,
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