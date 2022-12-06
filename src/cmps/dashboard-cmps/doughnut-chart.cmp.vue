<template>
  <section class="flex flex-col align-center bar-chart">
    <h2>Priority</h2>
    <DoughnutChart :chartData="testData" />
  </section>
</template>

<script>
import { defineComponent } from "vue";
import { DoughnutChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default defineComponent({
  name: "Home",
  props: {
    statusMap: Object,
  },
  mounted() {
    console.log(this.statusMap);
  },
  components: {
    DoughnutChart,
  },
  setup() {
    const testData = {
      labels: ["CRITICAL", "HIGH", "MEDIUM", "LOW", "EMPTY"],
      datasets: [
        {
          labels: ["CRITICAL", "HIGH", "MEDIUM", "LOW", "EMPTY"],
          data: [30, 40, 60, 70, 5],
          backgroundColor: [
            "#333333",
            "#401794",
            "#5559df",
            "#579bfc",
            "#c4c4c4",
          ],
        },
      ],
    };
    return { testData };
  },
});
</script>