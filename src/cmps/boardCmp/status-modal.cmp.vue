<template>
  <section class="flex flex-col align-center">
    <div class="arrow-up-div"></div>
    <el-card class="box-card">
      <div v-for="statusOpt in statusOptions" :key="statusOpt" class="status-modal-item" :class="{
        'status-done': statusOpt === 'Done',
        'status-working': statusOpt === 'Working on it',
        'status-stuck': statusOpt === 'Stuck',
        'status-empty': statusOpt === 'Empty',
        'marked-status': statusOpt === adjustedStatus,
        'border-animation': statusOpt === adjustedStatus,
        // 'marked-status': currStatus === 'Working'
      }" @click="setStatus(statusOpt)">
        {{ statusOpt !== 'Empty' ? statusOpt : '&nbsp;' }}
      </div>
    </el-card>
  </section>
</template>

<script>
export default {
  props: {
    currStatus: String,
  },
  data() {
    return {
      statusOptions: ["Done", "Working on it", "Stuck", "Empty"],
      adjustedStatus: this.currStatus !== 'Working' ? this.currStatus : 'Working on it'
    };
  },
  methods: {
    setStatus(statusOpt) {
      // todo verify its not breaking that area
      if (statusOpt === 'Working on it') {
        statusOpt = 'Working'
      } else if (!statusOpt) {
        statusOpt = 'Empty'
      }
      this.$emit("setStatus", statusOpt);
    },
  },
};
</script>
