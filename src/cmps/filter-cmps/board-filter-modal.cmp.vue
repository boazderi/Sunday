<template>
    <section class="board-filter-bar flex">
        <div class="flex new-task">
            <button class="new-task-btn" @click="onAddTask">New Task</button>
            <button class="new-task-arrow" style="  {  color: white;  }" v-icon="'arrowDown'"
                @click="onOpenDropDown"></button>

            <div class="dropDown1 flex column align-center">
                <div class="item flex align-center">
                    <span class="svg">l</span>
                    <span class="text">New group of tasks</span>
                </div>
            </div>
        </div>

        <button class="flex align-center board-filter-item outboard-hover">
            <span v-icon="'search'"></span> Search
        </button>

        <el-tooltip transition="none" auto-close=0 content="Filter by person">
            <button class="flex align-center board-filter-item outboard-hover">
                <span v-icon="'person'"></span> &nbsp;Person
            </button>
        </el-tooltip>
        <el-tooltip transition="none" auto-close=0 content="Filter by anything">
            <button class="flex align-center board-filter-item outboard-hover">
                <span v-icon="'filter'"></span> &nbsp;Filter
                <span v-icon="'arrowDownBlack'"></span>
            </button>
        </el-tooltip>
        <el-tooltip transition="none" auto-close=0 content="Sort by any column">
            <button class="flex align-center board-filter-item outboard-hover">
                <span v-icon="'sort'"></span> &nbsp;Sort
            </button>
        </el-tooltip>
        <el-tooltip transition="none" auto-close=0 content="Hidden columns">
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
            isDropDown1Open: false
        }
    },
    methods: {
        onOpenDropDown() {
            console.log('ba')
            this.isDropDown1Open = true
        }
    }
}
</script>
  