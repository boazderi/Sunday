<template>
  <section class="container home text-center">
    <h1>A platform built for a
new way of working
What would you like to manage with Sunday.com Work OS?
</h1>
    <button
    class="start-btn"
    @click="moveToBoard"
    >
      Get Started
    </button>
    <h5 class="text-center">
      No credit card needed   ✦   Unlimited time on Free plan
    </h5>
  </section>
  
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    moveToBoard(){
      this.$router.push({path:'/board/main-table'})
    }
  }
  
}
</script>
