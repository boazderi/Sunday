<template>
  <section class="timeline-container cell1">
    <!-- <progress value="32" max="100" data-label="" ></progress> -->
    <div
      class="timeline-btn"
      @mouseover="isHover = true"
      @mouseleave="isHover = false"
      @click="isDatePickerOpen = !isDatePickerOpen"
    >
      <span v-if="isHover">Set Dates</span>
      <span v-else> - </span>
      <span  class="timeline-picker">
        <el-date-picker v-if="isHover"
          format="YYYY/MM/DD"
          @change="printVal"
          v-model="value"
          type="daterange"
        />
      </span>
    </div>
    <div class="date-picker" v-if="isDatePickerOpen"></div>
  </section>
</template>

<script>
import { ref } from "vue";

export default {
  name: "timeline",
  data() {
    return {
      isHover: false,
      isDatePickerOpen: false,
      value: ref(""),
      defaultTime:
        ref <
        [Date, Date] >
        [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)],
    };
  },
  created() {
    console.log(this.value);
  },
  methods: {
    printVal() {
      console.log(this.value);
    },
  },
};
</script>

<style>
progress[value] {
  appearance: none;
  border: none;
  margin: 1em;
  position: relative;
  text-align: center;
}
progress[value]::-webkit-progress-bar {
  background-color: rgb(160, 160, 160);
  border-radius: 2em;
  color: white;
}
progress[value]::-webkit-progress-value {
  /* transition: all 0.2s ease-in-out; */
  background: rgb(255, 79, 234);
  border-radius: 2em;
    color: white;
}
progress:before {
  content: attr(data-label);
  font-size: 0.8em;
  vertical-align: 0;
  
  /*Position text over the progress bar */
  position:absolute;
  left:0;
  right:0;
}
</style>
