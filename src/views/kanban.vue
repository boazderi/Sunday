<template>
    <section v-if="kanbanColumn.length" class="kanban">
        <section class="kanban-content">
            <section class="kanban-col" v-for="column in kanbanColumn" :key="column.title"
                :style="{ 'background-color': column.color }">
                <div class="col-header">
                    <div>{{ column.title }} / {{ column.tasks.length }}</div>
                </div>
                <div class="col-content">
                    <section class="cards-container">

                        <article class="task-card" v-for="task in column.tasks" :key="task.content.id">
                            <div class="card-item" v-for="(cmp, idx) in cardColumns" :key="idx">
                                <!-- <div class="card-label">{{ cmp }}</div> -->
                                <component :is="cmp" :info="task.content"
                                    @update="updateTask($event, task.groupId, task.content.id)" />
                            </div>
                        </article>
                    </section>
                    <div class="add-task-btn">
                        <span v-icon="'addXSmall'" />
                        Add task
                    </div>
                </div>
            </section>
        </section>
        <!-- <kanban-filter :updateFilter="updateFilter" /> -->
    </section>

</template>

<script>
import kanbanFilter from '../cmps/kanban-cmps/kanban-filter.vue'

import taskTitle from "../cmps/dynamicCmp/task-title.vue"
import members from "../cmps/dynamicCmp/members.vue"
import date from "../cmps/dynamicCmp/date.vue"
import status from "../cmps/dynamicCmp/status.vue"
import priority from "../cmps/dynamicCmp/priority.vue"
import file from "../cmps/dynamicCmp/file.vue"
import textNote from "../cmps/dynamicCmp/text-note.vue"
import timeline from "../cmps/dynamicCmp/timeline.vue"
import { Container, Draggable } from "vue3-smooth-dnd"

export default {
    name: 'kanban',
    created() {
        this.setKanbanColumn()
    },
    data() {
        return {
            currBoard: this.getBoard,
            kanbanColumn: [],
            cardColumns: ['taskTitle', 'members', 'status'],
            options: {
                status: [
                    { title: 'Done', color: '#00c875' },
                    { title: 'Working', color: '#fdab3d' },
                    { title: 'Stuck', color: '#e2445c' },
                    { title: 'Empty', color: '#c3c4c3' },
                ],
                priority: [
                    { title: 'CRITICAL', color: '#333333' },
                    { title: 'HIGH', color: '#401794' },
                    { title: 'MEDIUM', color: '#5559df' },
                    { title: 'LOW', color: '#579bfc' },
                    { title: 'EMPTY', color: '#c3c4c3' },
                ]
            },
            filterBy: 'status'
        }
    },
    methods: {
        setKanbanColumn() {
            const currBoard = this.$store.getters.getCurrBoard

            this.options[this.filterBy].forEach((col, idx) => {
                var tasks = []

                currBoard.groups.forEach(group => {
                    group.tasks.forEach(task => {
                        if (task[this.filterBy] === col.title) {
                            tasks.push({ groupId: group.id, content: task })
                        }
                    })
                })

                this.kanbanColumn[idx] = { title: col.title, tasks, color: col.color }
            })
        },
        async updateTask({ prop, toUpdate }, groupId, taskId) {
            await this.$store.dispatch({
                type: "updateCurrBoard",
                groupId,
                taskId,
                prop,
                toUpdate,
            })
            this.setKanbanColumn()
        },
    },
    computed: {
        getBoard() {
            return this.$store.getters.getCurrBoard
        }
    },
    components: {
        kanbanFilter,
        taskTitle,
        members,
        date,
        status,
        priority,
        textNote,
        Draggable,
        Container,
        timeline,
        file
    }
}
</script>

