<template>
  <section class="cell2">
    <p
      class="priority flex align-center center fully"
      @click="togglePriorityOptions"
      :class="{
        'priority-critical': info.priority === 'CRITICAL',
        'priority-high': info.priority === 'HIGH',
        'priority-medium': info.priority === 'MEDIUM',
        'priority-low': info.priority === 'LOW',
        'priority-empty': info.priority === 'EMPTY',
      }"
    >
      {{ formattedPriority }}
    </p>
    <el-collapse-transition>
      <div class="priority-picker-modal" v-if="priorityModalOpen">
        <priority-modal @setPriority="setPriority"></priority-modal>
      </div>
    </el-collapse-transition>
  </section>
</template>
  
<script>
import priorityModal from "../boardCmp/priority-modal.cmp.vue";
export default {
  name: "priority",
  props: {
    info: Object,
  },
  data() {
    return {
      priorityModalOpen: false,
    };
  },
    methods: {
    togglePriorityOptions() {
      console.log("toggle priority options");
      this.priorityModalOpen = !this.priorityModalOpen;
      console.log("this.priorityModalOpen", this.priorityModalOpen);
    },
    setPriority(priorityOpt) {
      this.togglePriorityOptions();
      this.$emit("update", { prop: "priority", toUpdate: priorityOpt });
    },
  },
  computed:{
    formattedPriority(){
      if(this.info.priority==='EMPTY') return ''
      return this.info.priority
    }
  },
  components: {
    priorityModal,
  },
};
</script>