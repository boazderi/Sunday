<template>
  <section class="dashboard-content fully flex">
    <doughnut-chart :data="statusData" :options="options"></doughnut-chart>
    <bar-chart :data="priorityData" :options="options"></bar-chart>
    <polar-chart :data="membersData" :options="options"></polar-chart>
    <pie-chart :data="statusData" :options="options"></pie-chart>
  </section>
</template>

<script>
import barChart from "../cmps/dashboard-cmps/bar-chart.cmp.vue";
import doughnutChart from "../cmps/dashboard-cmps/doughnut-chart.cmp.vue";
import polarChart from "../cmps/dashboard-cmps/poalar-chart.cmp.vue";
import pieChart from "../cmps/dashboard-cmps/pie-chart.cmp.vue";
export default {
  data() {
    return {
      orderBy: "status",
      currentBoard: this.$store.getters.getCurrBoard,
      priorityMap: { CRITICAL: [], HIGH: [], MEDIUM: [], LOW: [], EMPTY: [] },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
      priorityData: {
        labels: ["CRITICAL", "HIGH", "MEDIUM", "LOW", "EMPTY"],
        datasets: [
          {
            data: [0, 0, 0, 0, 0],
            backgroundColor: [
              "#333333",
              "#401794",
              "#5559df",
              "#579bfc",
              "#c4c4c4",
            ],
          },
        ],
      },
      statusData: {
        labels: ["Done", "Working", "Stuck", "Empty"],
        datasets: [
          {
            data: [0, 0, 0, 0],
            backgroundColor: ["#00c875", "#fdab3d", "#e2435c", "#c4c4c4"],
          },
        ],
      },
      membersData: {
        labels: ["Boaz Deri", "Arnon Arditi", "Tal Liber", "Empty"],
        datasets: [
          {
            data: [0, 0, 0, 0],
            backgroundColor: ["#003f5c", "#ffa600", "#bc5090", "#c4c4c4"],
          },
        ],
      },
    };
  },
  async created() {
    this.currentBoard = await this.$store.getters.getCurrBoard
    console.log('this.currentBoard',this.currentBoard)
    this.setPriorityMap()
    this.setStatusData()
    this.setmembersMap()
  },
  methods: {
    setStatusData() {
      var data = this.statusData.datasets[0].data
      var dataLabels = this.statusData.labels
      this.currentBoard.groups.forEach((group) => {
        group.tasks.forEach((task) => {
          const idx = dataLabels.findIndex((label) => label === task.status)
          data[idx]++
        })
      })
    },
    setPriorityMap() {
      var data = this.priorityData.datasets[0].data
      var dataLabels = this.priorityData.labels
      this.currentBoard.groups.forEach((group) => {
        group.tasks.forEach((task) => {
          const idx = dataLabels.findIndex((label) => label === task.priority) 
          data[idx]++
        })
      });
    },
    setmembersMap() {
      var data = this.membersData.datasets[0].data;
      var dataLabels = this.membersData.labels;
      this.currentBoard.groups.forEach((group) => {
        group.tasks.forEach((task) => {
          task.members.forEach(member =>{
            const idx = dataLabels.findIndex((label) => label === member.fullname) 
            idx >= 0 ? data[idx]++ : data[3]++
          })
        })
      })
    },
  },
  components: {
    doughnutChart,
    barChart,
    polarChart,
    pieChart,
  },
};
</script>

