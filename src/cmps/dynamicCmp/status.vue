<template>
  <section>
    <p class="status" @click="toggleStatusOptions" :class="{
      'status-done': info.status === 'Done',
      'status-working': info.status === 'Working on it',
      'status-stuck': info.status === 'Stuck',
      'status-empty': info.status === '',
    }">{{ info.status }}</p>
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
  mounted() { },
  methods: {
    toggleStatusOptions() {
      this.statusModalOpen = !this.statusModalOpen;
    },
    setStatus(statusOpt) {
      this.toggleStatusOptions();
      this.$emit("update", { prop: "status", toUpdate: statusOpt });
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