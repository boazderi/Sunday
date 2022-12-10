<template>
  <section class="flex flex-col align-center chart-container">
    <h3 class="chart-head">Tasks by members</h3>
    <PolarAreaChart class="chart" :chartData="data" :options="options" />
  </section>
</template>

<script>
import { PolarAreaChart } from "vue-chart-3";
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
    PolarAreaChart,
  },
};
</script>