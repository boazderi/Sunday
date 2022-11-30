<template>
    <div>{{ groupInfo.title }}</div>
    <section class="group-list">
        <!-- render group labels by labels array -->
        <section class="labels-grid group-grid group-grid-child">
            <div class="cell-first cell">
                <input type="checkbox" />
                <p>Tasks</p>
            </div>
            <div class="cell" v-for="(label, idx) in labels" :key="idx">{{ label }}</div>
        </section>
        <!-- render grid cells by cmpOrder array -->
        <section class="group group-grid group-grid-child" v-for="task in groupInfo.tasks" :key="task.id">
            <section class="cell" v-for="(cmp, idx) in cmpOrder" :key="idx">
                <component :is="cmp" :info="task[cmp]" @update="updateTask($event, task.id)"></component>
            </section>
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
            // tasks: [
            //     {
            //         id: "t101",
            //         side: "null",
            //         tasktTitle: "Learn CSS",
            //         members: [
            //             { name: "tal", cellor: "red" },
            //             { name: "bal", cellor: "black" },
            //             { name: "shal", cellor: "green" },
            //         ],
            //         date: "27-02-2022",
            //         status: "IN WORK",
            //         priority: "LOW",
            //     },
            //     {
            //         id: "t102",
            //         side: "null",
            //         tasktTitle: "Learn vue",
            //         members: [
            //             { name: "tal", cellor: "red" },
            //             { name: "bal", cellor: "black" },
            //             { name: "shal", cellor: "green" },
            //         ],
            //         date: "27-02-2022",
            //         status: "STUCK",
            //         priority: "HIGH",
            //     },
            //     {
            //         id: "t103",
            //         side: "null",
            //         tasktTitle: "Learn js",
            //         members: [
            //             { name: "tal", cellor: "red" },
            //             { name: "bal", cellor: "black" },
            //             { name: "shal", cellor: "green" },
            //         ],
            //         date: "27-02-2022",
            //         status: "DONE",
            //         priority: "LOW",
            //     },
            // ],
            cmpOrder: ["side", "taskTitle", "status", "members", "priority", "date"],
            labels: ["status", "members", "priority", "date"],
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