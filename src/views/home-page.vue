<template>
  <section class="home-page flex column">

    <section class="first-layout flex column align-center">
      <h1 class="header-line">A platform built for a
        <br>
        new way of working
      </h1>
      <h3 class="sub-line">
        What would you like to manage with Sunday.com Work OS?
      </h3>
      <button class="start-btn" @click="moveToBoard">
        Get Started
      </button>

      <div class="star"></div>
      <div class="star2 star"></div>
      <div class="star3 star"></div>
      <!-- <div class="star4 star"></div> -->
      <div class="star5 star"></div>
      <div class="star6 star"></div>
      <div class="star7 star"></div>
      <!-- <div class="star8 star"></div> -->
      <div class="star9 star"></div>
      <div class="star10 star"></div>
      <div class="star11 star"></div>
      <div class="star12 star"></div>
      <div class="star13 star"></div>
      <div class="star14 star"></div>
      <div class="star15 star"></div>
      <!-- <div class="star16 star"></div>
      <div class="star17 star"></div> -->


    </section>

    <div class="home-img grow"></div>

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
    moveToBoard() {
      const CurrBoard = this.$store.getters.getCurrBoard
      if (CurrBoard) {
        this.$router.push({ path: `/board/${CurrBoard._id}/main-table` })
      }
    }

  }
}
</script>
