<template>
  <section class="cell2">
  <!-- todo-arnon code something wrong with showing the status -->
    <p
      class="status fully flex align-center center"
      @click="toggleStatusOptions"
      :class="{
        'status-done': info.status === 'Done',
        'status-working': info.status === 'Working',
        'status-stuck': info.status === 'Stuck',
        'status-empty': info.status === 'Empty',
      }"
    >
      {{ formattedStatus }}
    </p>

    <el-collapse-transition>
      <div class="status-picker-modal" v-if="statusModalOpen">
        <status-modal @setStatus="setStatus"></status-modal>
      </div>
    </el-collapse-transition>
  </section>
</template>
  
<script>
import statusModal from "../boardCmp/status-modal.cmp.vue";
export default {
  name: "status",
  props: {
    info: Object,
  },
  data() {
    return {
      statusModalOpen: false,
    };
  },
  mounted() {},
  methods: {
    toggleStatusOptions() {
      this.statusModalOpen = !this.statusModalOpen;
    },
    setStatus(statusOpt) {
      this.toggleStatusOptions();
      this.$emit("update", { prop: "status", toUpdate: statusOpt });
    },
  },
  computed: {
    formattedStatus() {
      // console.log(this.info.status)
      if (this.info.status === "Working") return "Working on it";
      else if (this.info.status === "Empty") return "";
      else return this.info.status;
    },
  },
  components: {
    statusModal,
  },
};
</script>

<!-- <style>
.status-picker-modal {
  --el-transition-duration: 2s;
}
</style> -->