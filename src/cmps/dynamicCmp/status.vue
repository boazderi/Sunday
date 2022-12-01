<template>
  <section @click="toggleStatusOptions">
    <p class="status">{{ info }}</p>
    <div class="status-picker-modal" v-if="statusModalOpen">
        <el-collapse-transition>
        <status-modal
        @setStatus="setStatus"
        ></status-modal>
        </el-collapse-transition>
    </div>
  </section>
</template>
  
<script>
import statusModal from "../boardCmp/status-modal.cmp.vue"
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
      console.log('this.statusModalOpen',this.statusModalOpen);
    },
    setStatus(statusOpt){
        this.toggleStatusOptions()
        this.$emit('update', {prop: 'status', toUpdate: statusOpt })
    }
  },
  components:{
      statusModal
  }
};
</script>