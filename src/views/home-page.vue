<template>
  <section class="home-page flex column">
    <button @click="onNavToLoginPage">login-signup</button>

    <header class="home-page-header">
      <div class="flex">
        <div class="header-img"><img src="https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670843553/l37uhxjpyxwwaxw6ifnp.png" alt=""></div>
        <div class="header-logo"> Sunday <span class="logo-suffix">.com</span></div>
      </div>
      <div class="flex login-section">
        <button class="login-btn">Login</button>
        <button>Sign-up</button>
      </div>
    </header>
    <section class="first-layout flex column align-center">
      <h1 class="header-line"><span class="first-homepage-line"> A platform built for a </span> 
        <br>
        new way of working
      </h1>
      <h3 class="sub-line">
        Manage everything with Sunday.com!
      </h3>
      <div class="comet-underline"></div>
      <button class="start-btn flex align-cene=ter" @click="moveToBoard">
        Start Demo <span class="see-demo-arrow" v-icon="'homePageArrow'"> </span>
      </button>
      <div class="star"></div>
      <div class="star2 star"></div>
      <div class="star3 star"></div>
      <div class="star4 star"></div>
      <div class="star5 star"></div>
      <div class="star6 star"></div>
      <div class="star7 star"></div>
      <div class="star8 star"></div>
      <div class="star9 star"></div>
      <div class="star10 star"></div>
      <div class="star11 star"></div>
      <div class="star12 star"></div>
      <div class="star13 star"></div>
      <div class="star14 star"></div>
      <div class="star15 star"></div>
      <div class="star16 star"></div>
      <div class="star17 star"></div>
    </section>
    <section class="second-layout flex">
      <div class="bottom-homepage-img small-home-img"> 
        <img src="https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670748647/fjpzc1uzx7tplcfmsrjt.jpg" alt="">
      </div>
      <div class="bottom-homepage-img  center-home-img"> 
        <img src="https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670748647/zpchoh3yjznee1nzog7j.jpg" alt="">
      </div>
      <div class="bottom-homepage-img small-home-img"> 
        <img src="https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670748646/gvlvpmnyzadeypqr2hpu.jpg" alt="">
      </div>

    </section>
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
    },
    onNavToLoginPage(){
      console.log('hey')
      this.$router.push('/login-signup')
    }

  }
}
</script>
