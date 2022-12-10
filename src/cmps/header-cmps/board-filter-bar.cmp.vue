<template>
  <section class="board-filter-bar flex">
    <div class="flex new-task">
      <button class="new-task-btn" @click="onAddTask">New Item</button>
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

    <input v-if="isSearch" @blur="isSearch = false" @input="setFilterBy('text')" v-model="filterBy.text" type="search"
      autofocus class="board-filter-item" />
    <button v-else @click="isSearch = true" class="flex align-center board-filter-item outboard-hover">
      <span v-icon="'search'"></span> Search
    </button>
    <el-tooltip transition="none" auto-close="0" content="Filter by person">
      <button @click="isPersonFilter = !isPersonFilter" :class="{ 'active-filter': isPersonFilter }"
        class="flex align-center board-filter-item outboard-hover">
        <span v-icon="'person'"> </span> &nbsp;Person
      </button>
    </el-tooltip>
    <el-tooltip transition="none" auto-close="0" content="Filter by anything">
      <button @click="isMainFilter = !isMainFilter" :class="{ 'active-filter': isMainFilter }"
        class="flex align-center board-filter-item outboard-hover">
        <span v-icon="'filter'"></span> &nbsp;Filter
        <span v-icon="'arrowDownBlack'" />
      </button>
    </el-tooltip>
    <el-tooltip transition="none" auto-close="0" content="Sort by any column">
      <button class="flex align-center board-filter-item outboard-hover">
        <span v-icon="'sort'"></span> &nbsp;Sort
      </button>
    </el-tooltip>
    <el-tooltip transition="none" auto-close="0" content="Hidden columns">
      <button class="flex align-center board-filter-item outboard-hover">
        <span v-icon="'hide'"></span> &nbsp; Hide
      </button>
    </el-tooltip>
    <button class="flex align-center board-filter-item outboard-hover">
      <span v-icon="'more'" />
    </button>
  </section>
  <el-collapse-transition v-if="isPersonFilter">
    <person-filter @setFilterBy="setFilterBy" :board="currBoard" />
  </el-collapse-transition>
  <el-collapse-transition v-if="isMainFilter">
    <main-filter @setFilterBy="setFilterBy" :board="currBoard"> </main-filter>
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