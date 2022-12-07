<template>
  <section class="flex flex-col align-center chart-container">
    <h3 class="chartHead">Tasks by status</h3>
    <PieChart
 class="chart" :chartData="data" :options="options" />
  </section>
</template>

<script>
import { PieChart
 } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  name: "Home",
  props: {
    data: Object,
    options: Object,
  },
  data() {
    return {

    };
  },
  mounted() {
  },
  components: {
    PieChart
,
  },
};
</script>