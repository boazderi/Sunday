<template>
    <section class="inventory-by-label ">
            <BarChart :chartData="data" :options="inventoryOptions"/>
    </section>
</template>
  
<script >
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
    name: 'vue-chart',
    props: {
        data:Object
    },
    created(){
        console.log(this.data);
    },
    data() {
        return {
            inventoryOptions: {
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
        }
    },
    components: { BarChart},
}
</script>

<style>
#bar-chart{
    width:300px;
    height: 300px;
}
</style>