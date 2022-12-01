<template>
    <section class="group-container">

        <groupTitle :groupInfo="groupInfo" @update="updateTask" />
        <section class="group-content">
            <!-- render group labels by labels array -->

            <section class="labels-grid group-grid ">
                <div class="cell-first cell">
                    <input type="checkbox" />
                </div>
                <div class="cell" v-for="(label, idx) in labels" :key="idx">{{ label }}</div>
            </section>

            <!-- render grid cells by cmpOrder array -->
            <section class="group-grid" v-for="task in groupInfo.tasks" :key="task.id">
                <!-- todo-put in each cmp the cell class jsut if necc -->
                <side class="cell" :taskId="task.id"></side>

                <section class="cell" v-for="(cmp, idx) in cmpOrder" :key="idx">
                    <component :is="cmp" :info="task[cmp]" @update="updateTask($event, task.id)" />
                </section>
            </section>

            <!-- CRUD-ADD TASK -->
            <section class="add-task group-grid">
                <div class="cell">
                    <input type="checkbox" />
                </div>
                <div class="input-wrapper flex align-center">
                    <input ref="addTask" @keypress="onAddTask($event)" @blur="onAddTask($event)"
                        class="flex align-center" type="text" placeholder="+ Add item">
                </div>

            </section>

            <!-- render progress by progress array -->
            <section class=" group-grid">
                <div class="empty"></div>
                <div class="empty"></div>

                <div class="cell" v-for="(item, idx) in progress" :key="idx">{{ item }}</div>
            </section>

        </section>
    </section>
</template>
  
<script>
import taskTitle from "../dynamicCmp/taskTitle.vue"
import side from "../dynamicCmp/side.vue"
import members from "../dynamicCmp/members.vue"
import date from "../dynamicCmp/date.vue"
import status from "../dynamicCmp/status.vue"
import priority from "../dynamicCmp/priority.vue"
import groupTitle from "./group-title.vue"
import bottomCrud from './bottom-crud.vue'


export default {
    name: "group-list",
    props: {
        groupInfo: Object
    },
    data() {
        return {

            cmpOrder: ["taskTitle", "status", "members", "priority", "date", "text", "file"],
            labels: ["Items", "Status", "Person", "Priority", "Date", "Text", "File"],
            progress: ["status", "", "priority", "", "", ""],


        };
    },
    methods: {
        updateTask({ prop, toUpdate }, taskId) {
            this.$store.dispatch({ type: 'updateCurrBoard', groupId: this.groupInfo.id, taskId, prop, toUpdate })
        },
        // TODO-prevent duplication with the triggers
        onAddTask(ev) {
            if (ev.key === 'Enter' || ev.type === 'blur') {
                this.$store.dispatch({
                    type: 'addNewTask', payload: {
                        taskTitle: this.$refs.addTask.value,
                        groupId: this.groupInfo.id
                    }
                })
                this.$refs.addTask.value = ''
            }
        },
    },
    components: {
        side,
        taskTitle,
        members,
        date,
        status,
        priority,
        groupTitle,
        bottomCrud
    },

};
</script>