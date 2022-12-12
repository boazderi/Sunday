<template>
  <section
    class="cell2 status-container"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
  >   
    <div
      class="peeling-box scale-up-tr"
      v-if="isHover"
      :class="{
        'table-modal-clicked': statusModalOpen,
        'status-done': info.status === 'Done',
        'status-working': info.status === 'Working',
        'status-stuck': info.status === 'Stuck',
        'status-empty': info.status === 'Empty',
      }"
    ></div>
    <!-- todo-arnon code something wrong with showing the status -->
    <p
      class="status fully flex align-center center"
      @click.stop="toggleStatusOptions"
      :class="{
        'status-done': info.status === 'Done',
        'status-working': info.status === 'Working',
        'status-stuck': info.status === 'Stuck',
        'status-empty': info.status === 'Empty',
      }"
    >
      {{ formattedStatus }}
    </p>

    <div class="status-picker-modal" v-click-outside-element="toggleStatusOptions" v-if="statusModalOpen">
      <el-collapse-transition>
        <status-modal @setStatus="setStatus"></status-modal>
      </el-collapse-transition>
    </div>
        <confety :class="{'is-done-triger': isDone}" v-if="isDone"></confety>
  </section>
</template>
  
<script>
import statusModal from "../boardCmp/status-modal.cmp.vue";
import confety from "../boardCmp/confety.cmp.vue"
export default {
  name: "status",
  props: {
    info: Object,
  },
  data() {
    return {
      statusModalOpen: false,
      isHover: false,
      isDone: false
    };
  },
  mounted() {},
  methods: {
    toggleStatusOptions() {
      this.statusModalOpen = !this.statusModalOpen;
      this.isHover = false;
    },
    setStatus(statusOpt) {
      if (statusOpt === 'Done') {
        this.isDone = true
        console.log(this.isDone);
        setTimeout(()=>{
          this.isDone = false
        console.log(this.isDone);
        }, 1000)
        }
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
    confety
  },
};
</script>