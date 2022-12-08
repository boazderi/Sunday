<template>
  <section>
    <el-card class="main-filter-modal">
      <div class="flex flex-col justify-between">
        <div class="flex flex-row main-filter-header">
          <div class="main-filter-title">Quick filters </div>
          <div class="main-filter-summary"> Showing all of {{ showAllTasksNumber }} tasks</div>
          <!-- <div><span v-icon="'help'"></span></div> -->
        </div>
        <div> Recent filters</div>
        <div class="filters-lists-container">
            <div class="flex">
              <div v-for="(title, idx) in titles" :key="idx">
                <main-filter-card
                  :title="title"
                />
              </div>
            </div>
        </div>
      </div>
    </el-card>
  </section>
</template>

<script>
import memberPreview from "./../member-preview.vue";
import mainFilterCard from "./main-filter-card.cmp.vue";
export default {
  props: {
    board: Object,
  },
  data() {
    return {
      isActive: '',
      titles:['Priiority', 'Status', 'Person'],

      filterBy: {
        memberId: null,
      },
    };
  },
  created() {},
  methods: {
    setFilterBy(memberId) {
      this.isActive = memberId;
      this.filterBy.memberId = memberId;
      this.$emit("setFilterBy", filterBy);
    },
  },
  computed: {
    showAllTasksNumber() {
      var sumAllTasks = 0;
      this.board.groups.forEach((group) => {
        sumAllTasks += group.tasks.length;
      });
      return sumAllTasks;
    },
    showPartialTasksNumber() {
        // todo need to be ediited - use later.
      var sumPartialTasks = 0;
      this.board.groups.forEach((group) => {
        sumPartialTasks += group.tasks.length;
      });
      return sumPartialTasks;
    },
  },
  components: {
    memberPreview,
    mainFilterCard
  },
};
</script>
