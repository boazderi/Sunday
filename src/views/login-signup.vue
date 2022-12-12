<template>
  <section class="login-signup flex column align-center">
    <div class="title flex align-center center">
      <!-- todo change the title by sign-up/login -->
      <h1>Log </h1> <span>In</span>
    </div>

    <div class="login-wrapper flex column align-center">
      <div v-if="!isLogin" class="fullname-wrapper flex align-center">
        <span>Fullname</span>
        <input type="text" v-model="credential.fullname" class="">
      </div>
      <div class="username-wrapper flex align-center">
        <span>Username</span>
        <input type="text" v-model="credential.username" class="">
      </div>

      <div class="password-wrapper flex align-center">
        <span>Password</span>
        <input type="text" v-model="credential.password" class="">
      </div>

      <button @click="onSetActionByCase" class="flex align-center center">{{ buttonTextByCase }}</button>
    </div>

    <div class="signup-text flex align-center">
      <span>{{ spanTextByCase }}</span>
      <button class="onOpenSignUp" @click="(isLogin = !isLogin)">{{ button2TextByCase }}</button>
    </div>

  </section>

</template>

<script>

export default {
  name: 'login-signup',
  data() {
    return {
      isLogin: true,
      credential: {
        fullname: '',
        username: '',
        password: '',
      },
    }
  },
  computed: {
    users() {
      return this.$store.getters.users
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
    buttonTextByCase() {
      return this.isLogin ? 'Log in' : 'Sign up'
    },
    spanTextByCase() {
      return this.isLogin ? 'Don\'t have an account yet?' : 'have an account?'
    },
    button2TextByCase() {
      return this.isLogin ? 'Sign up' : 'Log in'
    }
  },
  methods: {
    async onSetActionByCase() {
      const { fullname, username, password } = this.credential
      // when login case
      if (this.isLogin) {
        await this.$store.dispatch({
          type: 'login',
          userCred: { username, password }
        })
      }
      else {
        await this.$store.dispatch({
          type: 'signup',
          userCred: { fullname, username, password }
        })
      }
      // todo go to the main-board with the new user
      this.$router.push('/')
      console.log('finish')
    }
  }
}
</script>