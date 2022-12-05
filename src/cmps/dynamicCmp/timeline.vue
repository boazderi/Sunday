<template>
  <section class="timeline-container cell1">
    <div
      class="timeline-btn"
      @mouseover="isHover = true"
      @mouseleave="isHover = false"
      @click="isDatePickerOpen = !isDatePickerOpen"
    >
      <!-- <span v-if="isHover">Set Dates</span> -->
      <span class="timeline-picker">
        <el-date-picker v-model="value" type="daterange" />
      </span>
    </div>
    <div class="date-picker" v-if="isDatePickerOpen"></div>
  </section>
</template>

<script>
import { ref } from "vue";

export default {
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
  // created() {
  //   console.log(this.value);
  // },
};
</script>
