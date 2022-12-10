<template>
  <section class="">
    <article v-if="filterOptions" class="main-filter-card flex flex-col">
      <h4 class="card-title-item">{{ title }}</h4>
      <div class="card-items-container" v-if="title === 'priority' || title === 'status'">
        <div class="main-filter-card-item outboard-hover" v-for="(label, idx) in filterOptions[title].labels"
          :class="{ 'active-card-filter-item': acitvesLabels.some((currLabel) => currLabel === label) }"
          @click="setFilter(label, title)" :key="idx">
          <div class="card-color-circle" :style="{ backgroundColor: filterOptions[title].backgroundColor[idx], }" />
          <div>{{ label }}</div>
        </div>
      </div>
      <div class="card-items-container" v-else>
        <div class="main-filter-card-item outboard-hover" v-for="(label, idx) in filterOptions[title].labels" :key="idx"
          :class="{ 'active-card-filter-item': acitvesLabels.some((currLabel) => currLabel === label) }"
          @click="setFilter(label, title)">
          <img class="card-member-pic" :src="filterOptions[title].imgUrls[idx]" />
          <div>{{ label }}</div>
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
  data() {
    return {
      acitvesLabels: [],
    };
  },
  created() {
  },
  methods: {
    setFilter(label, title) {
      if (this.acitvesLabels.some((currLabel) => currLabel === label)) {
        const idx = this.acitvesLabels.findIndex((item) => item === label);
        this.acitvesLabels.splice(idx, 1);
      } else {
        this.acitvesLabels.push(label);
      }
      this.$emit("setFilter", { label, title });
    },
  },
  components: {
    memberPreview,
  },
};
</script>
