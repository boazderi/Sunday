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
      titles: ["priority", "status", "members"],
      filterOptionsData: {
        priority: {
          labels: ["CRITICAL", "HIGH", "MEDIUM", "LOW", "EMPTY"],
          backgroundColor: ["#333333",
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
        members: {
          imgUrls: [],
          labels: [],
          members: []
        },
      },
      filterBy: {
        status: [],
        priority: [],
        members: []
      },
    };
  },
  created() {
    this.setPersons()
  },
  methods: {
    setFilterBy({ title, label }) {
      if (title === 'members') {
        const idx = this.filterBy.members.findIndex(member => member.fullname === label)

        if (idx === -1) {
          const currMember = this.filterOptionsData.members.members.find(member => member.fullname === label)
          this.filterBy.members.push(currMember)
        }
        else {
          this.filterBy.members.splice(idx, 1)
        }
      } else {
        const idx = this.filterBy[title].findIndex(currLabel => currLabel === label)

        if (idx === -1) {
          this.filterBy[title].push(label)
        } else {
          this.filterBy[title].splice(idx, 1)
        }
      }
      this.$emit('setFilterBy', { prop: title, toUpdate: this.filterBy[title] })
    },
    setPersons() {
      this.filterOptionsData.members.members = this.board.members
      this.filterOptionsData.members.imgUrls = []
      this.filterOptionsData.members.labels = []

      this.board.members.forEach(member => {
        this.filterOptionsData.members.labels.push(member.fullname)
        if (member.imgUrl)
          this.filterOptionsData.members.imgUrls.push(member.imgUrl)
        else
          this.filterOptionsData.members.imgUrls.push("https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670197677/tvg88ynh3rjkldkfvvjr.png")
      })
    }
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
