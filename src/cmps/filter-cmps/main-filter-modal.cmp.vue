<template>
  <section>
    <el-card class="main-filter-modal">
      <div class="flex flex-col justify-between">
        <div class="flex flex-row main-filter-header">
          <div class="main-filter-title">Quick filters</div>
          <div class="main-filter-summary">
            Showing all of {{ showAllTasksNumber }} tasks
          </div>
          <!-- <div><span v-icon="'help'"></span></div> -->
        </div>
        <div class="main-filter-subheader">Recent filters</div>
        <div class="filters-lists-container flex">
          <div v-for="(title, idx) in titles" :key="idx">
            <main-filter-card :title="title" :filterOptions="filterOptionsData" @setFilter="setFilterBy" />
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
      isActive: "",
      titles: ["priority", "status", "person"],
      filterOptionsData: {
        priority: {
          labels: ["CRITICAL", "HIGH", "MEDIUM", "LOW", "EMPTY"],
          backgroundColor: [
            "#333333",
            "#401794",
            "#5559df",
            "#579bfc",
            "#c4c4c4",
          ],
        },
        status: {
          labels: ["Done", "Working", "Stuck", "Empty"],
          backgroundColor: ["#00c875", "#fdab3d", "#e2435c", "#c4c4c4"],
        },
        person: {
          imgUrls: [
            "https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670188872/v24ixm31xhncmyyjkqpx.jpg",
            "https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670188871/ggfq1eh886iohap9nmmd.jpg",
            "https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670188871/m99ikqcqjcuw75m4z8sl.jpg",
            "https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670197677/tvg88ynh3rjkldkfvvjr.png",
          ],
          labels: ["Boaz Deri", "Arnon Arditi", "Tal Liber", "Empty"],
        },
      },
      filterBy: {
        status: [],
        priority: [],
        members: []
      },
    };
  },
  created() { },
  methods: {
    setFilterBy({ title, label }) {
      const idx = this.filterBy[title].findIndex(currLabel => currLabel === label)

      if (idx === -1) {
        this.filterBy[title].push(label)
      } else {
        this.filterBy[title].splice(idx, 1)
      }

      this.$emit('setFilterBy', { prop: title, toUpdate: this.filterBy[title] })
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
    mainFilterCard,
  },
};
</script>
