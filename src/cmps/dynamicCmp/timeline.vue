<template>
  <section class="timeline-container cell1">
    <!-- <progress value="32" max="100" data-label="" ></progress> -->
    <div class="timeline-btn" @mouseover="isHover = true" @mouseleave="isHover = false"
      :class=" {'after-set-date':isDateSet}" @click="
  isDatePickerOpen = !isDatePickerOpen,
  handleOpen;
      ">
      <span v-if="isHover">{{
          isDateSet ? timelineHover : "Set Dates"
      }}</span>
      <span v-else>
        {{
            timelineContent ? timelineContent : "-"
        }}
      </span>
      <el-date-picker class="timeline-input" format="YYYY/MM/DD" @change="printVal" v-model="value" value-format="x"
        placeholder="Set Dates" type="daterange" />
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
      isDateSet: false,
      value: ref(""),
    };
  },
  created() {
  },
  methods: {
    printVal() {
    },
  },
  computed: {
    timelineContent() {
      if (this.value) {
        this.isDateSet = true
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        // from
        var fromDate = new Date(this.value[0]);
        var fromYear = `,'${(fromDate.getFullYear() + '').substring(2, 4)}`
        var fromMonth = fromDate.getMonth();
        var fromDay = fromDate.getDate();
        // to
        var toDate = new Date(this.value[1]);
        var toYear = `,'${(toDate.getFullYear() + '').substring(2, 4)}`
        var toMonth = toDate.getMonth();
        var toDay = toDate.getDate();
        var dates = [fromDate, toDate];
        if (fromYear === toYear) {
          console.log("same year");
          if (fromMonth === toMonth) {
            console.log("same month");
            return `${months[fromMonth].substring(0, 3)} ${fromDay} - ${toDay}`
          }
        }
        console.log("not same year");
        return `${months[fromMonth].substring(0, 3)} ${fromDay} ${fromYear} - ${months[toMonth].substring(0, 3)} ${toDay} ${toYear}`;
      }
      return "";
    },
    timelineHover() {
      var tsRange = this.value[1] - this.value[0]
      return (tsRange / 24 / 60 / 60 / 1000) + 'd'
    }
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
