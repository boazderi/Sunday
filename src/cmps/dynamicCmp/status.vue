<template>
  <section>
    <p
      class="status"
      @click="toggleStatusOptions"
      :class="{
        'status-done': info === 'Done',
        'status-working': info === 'Working on it',
        'status-stuck': info === 'Stuck',
        'status-empty': info === '',
      }"
    >
      {{ info }}
    </p>
    <el-collapse-transition>
      <div class="status-picker-modal"  v-if="statusModalOpen">
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
    info: String,
  },
  data() {
    return {
      statusModalOpen: false,
    };
  },
  mounted() {},
  methods: {
    toggleStatusOptions() {
      console.log("toggle status options");
      this.statusModalOpen = !this.statusModalOpen;
      console.log("this.statusModalOpen", this.statusModalOpen);
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