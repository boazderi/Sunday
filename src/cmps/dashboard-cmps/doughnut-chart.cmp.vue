<template>
  <section class="flex flex-col align-center chart-container">
    <h3 class="chart-head" >Tasks by status</h3>
    <DoughnutChart class="chart" :chartData="data" :options="options"/>
  </section>
</template>

<script>
import { DoughnutChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  name: "doughnut-chart",
  props: {
    data: Object,
    options: Object,
  },
  data() {
    return {

    };
  },
  components: {
    DoughnutChart,
  },
};
</script>

