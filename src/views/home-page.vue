<template>
  <section class="home-page flex column">

    <header class="home-page-header">
      <div class="flex">
        <div class="header-img"><img src="https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670843553/l37uhxjpyxwwaxw6ifnp.png" alt=""></div>
        <div class="header-logo"> Sunday <span class="logo-suffix">.com</span></div>
      </div>
      <div class="flex login-section">
        <button class="login-btn" @click="onNavToLoginPage">Login / Signup</button>
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
      <div class="star1 star"></div>
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
        <img src="https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670929113/m9hk8uhs7w7nvlhhyb0p.jpg" alt="">
      </div>
      <div class="bottom-homepage-img  center-home-img"> 
        <img src="https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670925994/rud8jppnthc9rxw4sjuw.jpg" alt="">
      </div>
      <div class="bottom-homepage-img small-home-img"> 
        <img src="https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670928919/pqb2xwpkxsaytq3n2kfo.jpg" alt="">
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
      this.$router.push('/login-signup')
    }

  }
}
</script>
