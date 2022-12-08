<template>
  <section
    v-if="isDataSection"
    @click="toggleSections"
    title="Click to switch"
    class="dashboard-stats chart-container flex flex-col"
  >
  <h3 class="cards-data-title"> Data Cards </h3>
  <div class="flex cards-stats-container">
    <article class="stat flex">
      <h4 class="card-title-item">Total board tasks</h4>
      <h2>{{ this.data.tasks }}</h2>
    </article>
    <article class="stat flex">
      <h4 class="card-title-item">Board members</h4>
      <h2>{{ this.data.members }}</h2>
    </article>
    <article class="stat flex">
      <h4 class="card-title-item">Total board groups</h4>
      <h2>{{ this.data.groups }}</h2>
    </article>
      </div>
  </section>
  <section
    v-else
    @click="toggleSections"
    title="Click to switch"
    class="dashboard-stats chart-container flex flex-col"
  >
    <h3 class="cards-data-title"> Members Cards </h3>
  <div class="flex cards-stats-container">

    <article class="stat flex">
      <h4 class="card-title-item">Tal Liber</h4>
      <div><img class="memberDashPic" :src="this.members[0].imgUrl" alt="" /></div>
    </article>
    <article class="stat flex">
      <h4 class="card-title-item">Boaz Deri</h4>
        <div><img class="memberDashPic" :src="this.members[2].imgUrl" alt="" /></div>
    </article>
    <article class="stat flex">
        <h4 class="card-title-item">Arnon Ardity</h4>
        <div><img class="memberDashPic" :src="this.members[1].imgUrl" alt="" /></div>
    </article>
          </div>
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
