<template>
  <section class="board-filter-bar flex">
    <div class="flex new-task">
      <button class="new-task-btn" @click="onAddTask">New Task</button>
      <button class="new-task-arrow" style="{color: white; }" v-icon="'arrowDown'" @click="onToggleDropDown"></button>

      <div v-if="isDropDown1Open" class="dropDown1 flex column">
        <div class="item flex align-center" @click="onAddGroup">
          <span class="svg" v-icon="'newGroup'"></span>
          <span class="text">New group of tasks</span>
        </div>
        <div class="item disabled flex align-center">
          <span class="svg" v-icon="'importTasks'"></span>
          <span class="text">Import tasks</span>
        </div>
      </div>
    </div>

    <span v-icon="'search'" class="search-nav-filter-icon"></span>
    <input @click="isSearch = true" @blur="isSearch = false" @input="setFilterBy('text')" v-model="filterBy.text"
      type="search" :class="{ 'search-open': isSearch }" class="board-filter-item search-nav-filter outboard-hover"
      placeholder="Search" />

    <el-tooltip transition="none" auto-close="0" content="Filter by person">
      <button @click.stop="isPersonFilter = !isPersonFilter" 
        :class="{ 'active-filter': isPersonFilter }" class="flex align-center person board-filter-item outboard-hover">
        <span class="svg" v-icon="'person'"> </span> &nbsp;Person
      </button>
    </el-tooltip>

    <el-tooltip transition="none" auto-close="0" content="Filter by anything">
      <button @click.stop="isMainFilter = !isMainFilter"
        :class="{ 'active-filter': isMainFilter }" class="flex filter align-center board-filter-item outboard-hover">
        <span class="svg" v-icon="'filter'"></span> &nbsp;Filter
        <span class="svg arrow-down" v-icon="'arrowDownBlack'"></span>
      </button>
    </el-tooltip>

    <el-tooltip transition="none" auto-close="0" content="Sort by any column">
      <button class="flex align-center board-filter-item outboard-hover">
        <span class="svg" v-icon="'sort'"></span> &nbsp;Sort
      </button>
    </el-tooltip>

    <!-- <el-tooltip transition="none" auto-close="0" content="Hidden columns">
      <button class="flex align-center board-filter-item outboard-hover">
        <span class="svg" v-icon="'hide'"></span> &nbsp; Hide
      </button>
    </el-tooltip> -->

    <button class="flex align-center board-filter-item outboard-hover">
      <span class="svg no-cursor" v-icon="'more'" />
    </button>
  </section>

  <el-collapse-transition v-if="isPersonFilter">
    <person-filter v-click-outside-element="togglePersonFilter" @setFilterBy="setFilterBy" :board="currBoard" />
  </el-collapse-transition>
  <el-collapse-transition v-if="isMainFilter">
    <main-filter v-click-outside-element="toggleMainFilter" @setFilterBy="setFilterBy" :board="currBoard"> </main-filter>
  </el-collapse-transition>
</template>


<script>
import personFilter from "../filter-cmps/person-filter-modal.cmp.vue";
import mainFilter from "../filter-cmps/main-filter-modal.cmp.vue";

export default {
  data() {
    return {
      isSearch: false,
      isPersonFilter: false,
      isDropDown1Open: false,
      isMainFilter: false,
      filterBy: {
        text: "",
        members: [],
        groupTitle: "",
        dynamicProps: [
          {
            prop: "priority",
            values: [],
          },
          {
            prop: "status",
            values: [],
          },
        ],
      },
      currBoard: this.$store.getters.getCurrBoard,
    };
  },
  methods: {
    onToggleDropDown() {
      this.isDropDown1Open = !this.isDropDown1Open
    },
    togglePersonFilter() {
      this.isPersonFilter = false
    },
    toggleMainFilter() {
      this.isMainFilter = false
    },
    async onAddGroup() {
      await this.$store.dispatch({ type: 'addGroup' })
      this.isDropDown1Open = false
    },
    onAddTask() {
      const currBoard = this.$store.getters.getCurrBoard;
      const groupId = currBoard.groups[0].id;
      this.$store.dispatch({
        type: "addNewTask",
        payload: {
          taskTitle: "New Task",
          groupId: groupId,
        },
      });
    },
    setFilterBy({ prop, toUpdate }) {

      switch (prop) {
        case "text":
          break;
        case "members":
          this.filterBy.members = toUpdate;
          break;
        case "priority":
          this.filterBy.dynamicProps[0].values = toUpdate
          break;
        case "status":
          this.filterBy.dynamicProps[1].values = toUpdate
          break;
      }

      this.$store.commit({
        type: "setFilterBy",
        filterBy: this.filterBy,
      });
    },
  },
  components: {
    personFilter,
    mainFilter,
  },
};
</script>

<!-- from group cmp -->
     <!-- onAddTask() {
            this.$store.dispatch({
                type: 'addNewTask', payload: {
                    taskTitle: this.$refs.addTask.value,
                    groupId: this.groupInfo.id
                }
            })
            this.$refs.addTask.value = ''
        }, -->