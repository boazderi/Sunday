<template>
  <section class="flex flex-col align-center">
    <div class="arrow-up-div"></div>
    <el-card class="box-card">
      <div
        v-for="priorityOpt in priorityOptions"
        :key="priorityOpt"
        class="priority-modal-item priority"
        :class="{
          'priority-critical': priorityOpt === 'CRITICAL',
          'priority-high': priorityOpt === 'HIGH',
          'priority-medium': priorityOpt === 'MEDIUM',
          'priority-low': priorityOpt === 'LOW',
          'priority-empty': priorityOpt === 'EMPTY',
          'marked-priority': priorityOpt === currPriority,
        }"
        @click="setPriority(priorityOpt)"
      >
        {{ priorityOpt !== 'EMPTY' ? priorityOpt.toLowerCase() : "&nbsp;" }}
      </div>
    </el-card>
  </section>
</template>

<script>
export default {
  props:{
    currPriority: String,
  },
  data() {
    return {
      priorityOptions: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'EMPTY'],
    };
  },
  methods: {
    setPriority(priorityOpt) {
      if (!priorityOpt) priorityOpt = 'EMPTY';
      this.$emit('setPriority', priorityOpt);
    },
  },
  computed: {
    formattedPriority() {
      return this.info.priority.toLowerCase();
    },
  },
};
</script>
