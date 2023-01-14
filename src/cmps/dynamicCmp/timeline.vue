<template>
  <section class="timeline-container cell1 wide-cell">
    <!-- <progress value="32" max="100" data-label="" ></progress> -->
    <div class="timeline-btn" @mouseover="isHover = true" @mouseleave="isHover = false"
      :class=" {'after-set-date':isDateSet}" @click="isDatePickerOpen = !isDatePickerOpen" :style="{'background': timelineBcg
      }">
      <span v-if="isHover">{{ isDateSet ? timelineHover : "Set Dates" }}</span>
      <span v-else>{{ timelineContent ? timelineContent : "-" }}</span>
      <el-date-picker class="timeline-input" format="YYYY/MM/DD" @change="updateTimePassed" v-model="value"
        value-format="x" placeholder="Set Dates" type="daterange" />
    </div>
    
  </section>
</template>

<script>
import { ref } from "vue";

export default {
  name: "timeline",
  props: {
    group: Object,
    info: Object
  },
  data() {
    return {
      isHover: false,
      isDatePickerOpen: false,
      isDateSet: false,
      value: ref(""),
      timePassed: 0
    };
  },
  created() {
    if (this.info.timeline) {
      this.value = this.info.timeline
      this.isDateSet = true
    }
  },
  methods: {
    updateTimePassed() {
      this.$emit('update', { prop: 'timeline', toUpdate: this.value })
    },
  },
  computed: {
    timelineBcg() {
      if ((Date.now() - this.value[1]) >= 0) this.timePassed = 100
      else if ((Date.now() - this.value[0]) < 0) this.timePassed = 0
      else this.timePassed = ((new Date().getDate() - new Date(this.value[0]).getDate()) / (new Date(this.value[1]).getDate() - new Date(this.value[0]).getDate())) * 100
      if (!this.isDateSet) return '#a0a0a0'

      return `linear-gradient(90deg, ${this.group.color} ${this.timePassed}%, #000000 ${this.timePassed}%)`
    },
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
        if (fromYear === toYear) {
          if (fromMonth === toMonth) {
            return `${months[fromMonth].substring(0, 3)} ${fromDay} - ${toDay}`
          }
        }
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
  background-color: #a0a0a0;
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

/* .after-set-date {
  background: linear-gradient(90deg, #FFC0CB 80%, #00FFFF 20%);
} */
</style>
