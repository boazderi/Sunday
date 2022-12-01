<template>
  <el-card class="box-card">
    <div
      v-for="statusOpt in statusOptions"
      :key="statusOpt"
      class="status-modal-item"
      :class="{}"
      @click="setStatus(statusOpt)"
    >
      {{ statusOpt }}
    </div>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      statusOptions: ["Done", "Working on it", "Stuck", ""],
    };
  },
  methods:{
      setStatus(statusOpt){
          console.log(statusOpt);
          this.$emit('setStatus', statusOpt)
      }
  }
};
</script>
