<template>
  <section class="flex flex-col align-center">
    <div v-icon="'arrowUpFull'"></div>
    <el-card class="box-card">
      <div v-for="statusOpt in statusOptions" :key="statusOpt" class="status-modal-item" :class="{
        'status-done': statusOpt === 'Done',
        'status-working': statusOpt === 'Working on it',
        'status-stuck': statusOpt === 'Stuck',
        'status-empty': statusOpt === '',
      }" @click="setStatus(statusOpt)">
        {{ statusOpt || '&nbsp;' }}
      </div>
    </el-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      statusOptions: ["Done", "Working on it", "Stuck", ""],
    };
  },
  methods: {
    setStatus(statusOpt) {
      console.log(statusOpt);
      this.$emit("setStatus", statusOpt);
    },
  },
};
</script>
