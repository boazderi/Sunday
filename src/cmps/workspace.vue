<template>
  <section class="workspace">
    <section class="details">
      <h1>workspace</h1>

    </section>
    <button @click="(isOpen = !isOpen)">toggle</button>

  </section>
</template>

<script>

export default {
  data() {
    return {
      boards: [],
      isOpen: true,
    }
  },
  created() {
    this.boards = this.$store.getters.boards
    console.log(this.boards)
  }

}
</script>

<style>

</style>