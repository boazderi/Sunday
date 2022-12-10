<template>
  <section class="flex flex-col align-center">
    <div class="arrow-up-div"></div>
    <el-card class="box-card">
      <div
        v-for="priorityOpt in priorityOptions"
        :key="priorityOpt"
        class="priority-modal-item"
        :class="{
          'priority-critical': priorityOpt === 'CRITICAL',
          'priority-high': priorityOpt === 'HIGH',
          'priority-medium': priorityOpt === 'MEDIUM',
          'priority-low': priorityOpt === 'LOW',
          'priority-empty': priorityOpt === '',
        }"
        @click="setPriority(priorityOpt)"
      >
        {{ priorityOpt || "&nbsp;" }}
      </div>
    </el-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      priorityOptions: ["CRITICAL", "HIGH", "MEDIUM", "LOW", ""],
    };
  },
  methods: {
    setPriority(priorityOpt) {
      if (!priorityOpt) priorityOpt = "EMPTY";
      this.$emit("setPriority", priorityOpt);
    },
  },
};
</script>
