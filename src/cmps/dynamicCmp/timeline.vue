<template>
  <section class="timeline-container cell1">
    <!-- <progress value="32" max="100" data-label="" ></progress> -->
    <div
      class="timeline-btn"
      @mouseover="isHover = true"
      @mouseleave="isHover = false"
      @click="
        isDatePickerOpen = !isDatePickerOpen;
        handleOpen;
      "
    >
      <span v-if="isHover">{{ timelineContent ? `${timelineContent[0]} - ${timelineContent[1]}` : 'Set Dates'}}</span>
      <span v-else> {{timelineContent ? `${timelineContent[0]} - ${timelineContent[1]}` : '-'}} </span>
      <el-date-picker
        class="timeline-input"
        format="YYYY/MM/DD"
        @change="printVal"
        v-model="value"
        value-format="x"
        placeholder="Set Dates"
        type="daterange"
      />
    </div>
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
    };
  },
  created() {
    console.log(this.timelineContent);
  },
  methods: {
    printVal() {
      console.log(this.value);
    },
  },
  computed: {
    timelineContent() {
      console.log('this.value',this.value);
      if (this.value){
        var fromDate= new Date(this.value[0]);
        var toDate= new Date(this.value[1]);
        console.log([fromDate.toDateString(), toDate.toDateString()]);
        return [fromDate.toDateString(), toDate.toDateString()]
      }
      return ''
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
  position: absolute;
  left: 0;
  right: 0;
}
</style>
