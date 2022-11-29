<template>
  <section class="container home text-center">
    <h1>Home Page</h1>
    <button
    @click="moveToBoard"
    >
      Go to board
    </button>
    <h5 class="text-center">
      Powered up Frontend 
    </h5>
    <img alt="Vue logo" src="../assets/logo.png">
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
