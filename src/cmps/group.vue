<template>
    <div>{{ groupInfo.title }}</div>
    <section class="group-list">
        <!-- render group labels by labels array -->
        <section class="labels-grid group-grid ">
            <div class="cell-first cell">
                <input type="checkbox" />
            </div>
            <div class="cell" v-for="(label, idx) in labels" :key="idx">{{ label }}</div>
        </section>

        <!-- render grid cells by cmpOrder array -->
        <section class="group-grid " v-for="task in groupInfo.tasks" :key="task.id">
            <section class="cell" v-for="(cmp, idx) in cmpOrder" :key="idx">
                <component :is="cmp" :info="task[cmp]" @update="updateTask($event, task.id)"></component>
            </section>
        </section>

        <!-- CRUD-ADD TASK -->
        <section class="add-task">
            <input type="text">
        </section>

        <!-- render progress by progress array -->
        <section class="progress-grid">
            <div v-for="(item, idx) in progress" :key="idx">{{ item }}</div>
        </section>

    </section>
</template>
  
<script>

import taskTitle from "./dynamicCmp/taskTitle.vue"
import side from "./dynamicCmp/side.vue"
import members from "./dynamicCmp/members.vue"
import date from "./dynamicCmp/date.vue"
import status from "./dynamicCmp/status.vue"
import priority from "./dynamicCmp/priority.vue"

export default {
    name: "group-list",
    props: {
        groupInfo: Object
    },
    data() {
        return {
            cmpOrder: ["side", "taskTitle", "status", "members", "priority", "date"],
            labels: ["items", "status", "members", "priority", "date"],
            progress: [null, null, "status", null, "priority", null],
        };
    },
    methods: {
        updateTask({ prop, toUpdate }, taskId) {
            // console.log(prop, toUpdate, taskId);
            this.$store.dispatch({ type: 'updateCurrBoard', groupId: this.groupInfo.id, taskId, prop, toUpdate })
        }
    },
    components: {
        side,
        taskTitle,
        members,
        date,
        status,
        priority,
    },
};
</script>