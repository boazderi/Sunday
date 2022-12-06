<template>
    <section class="board-filter-bar flex">
        <div class="flex new-task">
            <button class="new-task-btn" @click="onAddTask">New Task</button>
            <button class="new-task-arrow" style="
           {
            color: white;
          }
        " v-icon="'arrowDown'"></button>
        </div>
        <button class="flex align-center board-filter-item outboard-hover">
            <span v-icon="'search'"></span> Search
        </button>
        <el-tooltip content="Filter by person">
            <button class="flex align-center board-filter-item outboard-hover">
                <span v-icon="'person'"></span> &nbsp;Person
            </button>
        </el-tooltip>
        <el-tooltip content="Filter by anything">
            <button class="flex align-center board-filter-item outboard-hover">
                <span v-icon="'filter'"></span> &nbsp;Filter
                <span v-icon="'arrowDownBlack'"></span>
            </button>
        </el-tooltip>
        <el-tooltip content="Sort by any column">
            <button class="flex align-center board-filter-item outboard-hover">
                <span v-icon="'sort'"></span> &nbsp;Sort
            </button>
        </el-tooltip>
        <el-tooltip content="Hidden columns">
            <button class="flex align-center board-filter-item outboard-hover">
                <span class="hide-icon" v-icon="'hide'"></span>&nbsp;Hide
            </button>
        </el-tooltip>
        <button class="flex align-center board-filter-item outboard-hover">
            <span v-icon="'more'"></span>
        </button>
    </section>
</template>
<script>
export default {
    data() {
        return {
        }
    },
}
</script>
  