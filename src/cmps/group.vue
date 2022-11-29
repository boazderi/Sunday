<template>
    <section class="group-list">
        <!-- render group labels by labels array -->
        <section class="labels-grid grid grid-child">
            <div class="col">
                <input type="checkbox" />
                <p>Items</p>
            </div>
            <div v-for="(label, idx) in labels" :key="idx">{{ label }}</div>
        </section>
        <!-- render grid cells by cmpOrder array -->
        <section class="group grid grid-child" v-for="task in tasks" :key="task.id">
            <section class="grid-item" v-for="(cmp, idx) in cmpOrder" :key="idx">
                <component :is="cmp" :info="task[cmp]"></component>
            </section>
        </section>
        <!-- render progress by progress array -->
        <section class="progress-grid">
            <div v-for="(item, idx) in progress" :key="idx">{{ item }}</div>
        </section>
    </section>
</template>
  
<script>
import tasktTitle from "./dynamicCmp/tasktTitle.vue";
import side from "./dynamicCmp/side.vue";
import members from "./dynamicCmp/members.vue";
import date from "./dynamicCmp/date.vue";
import status from "./dynamicCmp/status.vue";
import priority from "./dynamicCmp/priority.vue";
export default {
    name: "group-list",
    data() {
        return {
            tasks: [
                {
                    id: "t101",
                    side: "null",
                    tasktTitle: "learn CSS",
                    members: [
                        { name: "tal", color: "red" },
                        { name: "bal", color: "black" },
                        { name: "shal", color: "green" },
                    ],
                    date: "27-02-2022",
                    status: "IN WORK",
                    priority: "LOW",
                },
                {
                    id: "t102",
                    side: "null",
                    tasktTitle: "learn vue",
                    members: [
                        { name: "tal", color: "red" },
                        { name: "bal", color: "black" },
                        { name: "shal", color: "green" },
                    ],
                    date: "27-02-2022",
                    status: "STUCK",
                    priority: "HIGH",
                },
                {
                    id: "t103",
                    side: "null",
                    tasktTitle: "learn js",
                    members: [
                        { name: "tal", color: "red" },
                        { name: "bal", color: "black" },
                        { name: "shal", color: "green" },
                    ],
                    date: "27-02-2022",
                    status: "DONE",
                    priority: "LOW",
                },
            ],
            cmpOrder: ["tasktTitle", "status", "members", "priority", "date"],
            labels: ["status", "members", "priority", "date"],
            progress: [null, null, "status", null, "priority", null],
        };
    },
    components: {
        side,
        tasktTitle,
        members,
        date,
        status,
        priority,
    },
};
</script>
  
<style>
.grid {
    display: grid;
    grid-template-columns: 400px repeat(auto-fill, minmax(200px, 200px));
    grid-template-rows: 36px;
    grid-auto-flow: column;
    grid-auto-columns: minmax(200px, 200px);
}

.grid-child> :first-child {
    position: sticky;
    z-index: 10;
    left: 0;
    background-color: white;
}


.progress-grid {
    width: 100%;
    background: red;
    display: grid;
    grid-template-columns: 10px 200px 200px 200px 200px 200px;
    justify-content: center;
}

.group-list {
    margin-top: 2em;
    width: 800px;
    overflow-x: scroll;
    position: relative;
    border: 1px solid #d0d4e4;
    border-radius: 6px;
}

.col {
    display: flex;
    align-items: center;
}
</style>