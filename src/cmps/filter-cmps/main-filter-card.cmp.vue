<template>
  <section class="">
    <article v-if="filterOptions" class="main-filter-card flex flex-col">
      <h4 class="card-title-item">{{ title }}</h4>
      <div class="card-items-container" v-if="title === 'priority' || title === 'status'">
        <div class="main-filter-card-item outboard-hover" v-for="(label, idx) in filterOptions[title].labels"
          @click="setFilter(label, title)" :key="idx">
          <div class="card-color-circle" :style="{ backgroundColor: filterOptions[title].backgroundColor[idx] }">
          </div>
          <div> {{ label }} </div>
        </div>
      </div>
      <div class="card-items-container" v-else>
        <div class="main-filter-card-item outboard-hover" v-for="(label, idx) in filterOptions[title].labels"
          :key="idx">
          <img class="card-member-pic" :src="filterOptions[title].imgUrls[idx]">

          <div> {{ label }} </div>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import memberPreview from "./../member-preview.vue";

export default {
  props: {
    title: String,
    filterOptions: Object,
  },
  created() {
    // console.log(this.filterOptions);
  },
  methods: {
    setFilter(label, title) {
      // console.log('label:',label);
      // console.log('title:',title);
      this.$emit('setFilter', { label, title })
    }
  },
  components: {
    memberPreview,
  },
};
</script>
