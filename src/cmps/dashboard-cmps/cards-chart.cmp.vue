<template>
  <section
    v-if="isDataSection"
    @click="toggleSections"
    class="dashboard-stats chart-container flex"
  >
    <article class="stat flex">
      <h4>Total board tasks</h4>
      <h2>{{ this.data.tasks }}</h2>
    </article>
    <article class="stat flex">
      <h4>Board members</h4>
      <h2>{{ this.data.members }}</h2>
    </article>
    <article class="stat flex">
      <h4>Total board groups</h4>
      <h2>{{ this.data.groups }}</h2>
    </article>
  </section>
  <section
    v-else
    @click="toggleSections"
    class="dashboard-stats chart-container flex"
  >
    <article class="stat flex">
      <h4>Tal</h4>
      <div><img class="memberDashPic" :src="this.members[0].imgUrl" alt="" /></div>
    </article>
    <article class="stat flex">
      <h4>Boaz</h4>
        <div><img class="memberDashPic" :src="this.members[2].imgUrl" alt="" /></div>
    </article>
    <article class="stat flex">
        <h4>Arnon</h4>
        <div><img class="memberDashPic" :src="this.members[1].imgUrl" alt="" /></div>
    </article>
  </section>
</template>

<script>
export default {
  props: {
    data: Object,
    members: Array,
  },
  data() {
    return {
      isDataSection: true,
    };
  },
  methods: {
    toggleSections() {
      this.isDataSection = !this.isDataSection;
    },
  },
};
</script>
