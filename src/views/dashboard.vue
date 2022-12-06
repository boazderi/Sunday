<template>
  <section class="dashboard">
    <section class="dashboard-content fully flex">
      <doughnut-chart :statusMap="statusMap"></doughnut-chart>
      <!-- <section class="tasks-by-order" v-for="value in statusMap" :key="value">
        <pre>{{ value }}</pre>
      </section> -->
      <!-- <div>priority!</div> -->
      <section class="priority-by-order" v-for="value in priorityMap" :key="value">
        <!-- <pre> {{value}} </pre> -->
        <!-- <bar-chart
        :statusMap="value"
        ></bar-chart> -->
      </section>
    </section>
  </section>
</template>

<script>
import barChart from "../cmps/dashboard-cmps/bar-chart.cmp.vue"
import doughnutChart from "../cmps/dashboard-cmps/doughnut-chart.cmp.vue";
export default {
  data() {
    return {
      orderBy: "status",
      currentBoard: this.$store.getters.getCurrBoard,
      statusMap: { Working: [], Stuck: [], Done: [], Empty: [] },
      priorityMap: { CRITICAL:[], HIGH:[], MEDIUM:[], LOW:[], EMPTY: []},
    };
  },
  async created() {
    this.currentBoard = await this.$store.getters.getCurrBoard;
    this.setPriorityMap()
    this.setStatusMap()
  },
  methods: {
      setStatusMap() {
        this.currentBoard.groups.forEach((group) => {
        group.tasks.forEach((task) => {
          this.statusMap[task.status].push(task);
        })
      })
    },
    setPriorityMap() {
      this.currentBoard.groups.forEach((group) => {
        group.tasks.forEach((task) => {
          this.priorityMap[task.priority].push(task);
        })
      })
    },
  },
  components: {
    doughnutChart,
    barChart
  },
};
</script>

