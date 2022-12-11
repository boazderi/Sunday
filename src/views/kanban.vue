<template>
    <!-- <section v-if="kanbanColumn.length" class="kanban flex align-center space-between"> -->
    <section v-if="kanbanColumn.length" class="kanban">

        <section class="kanban-content flex ">
            <Container orientation="horizontal" @drop="onColumnDrop($event)" drag-handle-selector=".column-drag-handle"
                :drop-placeholder="{
                    className: 'drop-placeholder1',
                    animationDuration: '200',
                    showOnTop: true
                }">
                <!-- KANBAN-COLUMN -->
                <Draggable v-for="column in kanbanColumn" :key="column.title">

                    <section class="kanban-col" :style="{ 'background-color': column.color }">
                        <div class="col-header">
                            <span class="column-drag-handle" v-icon="'handle'" />
                            <div>{{ column.title }} / {{ column.tasks.length }}</div>
                        </div>
                        <!-- Column content -->
                        <section class="col-content flex column">
                            <section class="cards-container">
                                <Container @drop="(ev) => onTaskDrop(column.title, ev)" group-name="task-card"
                                    :shouldAcceptDrop="(e, payload) => (e.groupName === 'task-card')"
                                    orientation="vertical" :get-child-payload="getTaskPayload(column.title)"
                                    :drop-placeholder="{
                                        className: 'drop-placeholder',
                                        animationDuration: '200',
                                        showOnTop: true
                                    }" drag-class="on-drag">

                                    <!-- task-cards -->
                                    <Draggable v-for="task in column.tasks" :key="task.content.id">

                                        <article class="task-card flex column">
                                            <div class="title-wrapper flex align-center space-between">
                                                <task-title :info="task.content"
                                                    @update="updateTask($event, task.groupId, task.content.id)"></task-title>
                                                <span class="svg" v-icon="'moreKanban'"></span>
                                            </div>

                                            <div class="card-item flex align-center space-between"
                                                v-for="(cmp, idx) in cardColumns" :key="idx">

                                                <div class="sub1 flex align-center ">
                                                    <div class="logo flex align-center center" v-icon="cmp"></div>
                                                    <span class="card-label">{{ cmp.charAt(0).toUpperCase() +
                                                            cmp.slice(1)
                                                    }}</span>
                                                </div>
                                                <!-- Dynamic cmps by -->
                                                <!-- todo adjust the dropdowns-modal that need to be open -->
                                                <div class="cmp-wrapper">
                                                    <component :is="cmp" :info="task.content"
                                                        @update="updateTask($event, task.groupId, task.content.id)" />
                                                </div>
                                            </div>
                                        </article>
                                    </Draggable>
                                </Container>

                            </section>

                            <!-- ADD_TASK SEC -->
                            <div v-if="!column.isAddTask" class="add-task-btn" @click="onOpenTask(column.title)">
                                <span v-icon="'addXSmall'" />
                                Add task
                            </div>

                            <div v-else class="add-task flex align-center">
                                <input type="text" :ref="column.title" class="grow">
                                <button :style="{ 'background-color': column.color }" class="flex align-center"
                                    @click="onAddTask(column.title)">

                                    <span class="plus">+</span>
                                    <span>Add</span></button>
                            </div>
                        </section>

                    </section>
                </Draggable>
            </Container>
        </section>

        <kanban-filter @setSelectedColumns="setSelectedColumns" @setFilterBy="setFilterBy" />
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
            cardColumns: [],
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
            filterBy: 'status',
            // isAddTask: false,
            addTaskTitle: '',
        }
    },
    methods: {
        setKanbanColumn() {
            const currBoard = this.$store.getters.getCurrBoard
            this.kanbanColumn = []
            this.options[this.filterBy].forEach((col, idx) => {
                var tasks = []

                currBoard.groups.forEach(group => {
                    group.tasks.forEach(task => {
                        if (task[this.filterBy] === col.title) {
                            tasks.push({ groupId: group.id, content: task })
                        }
                    })
                })
                // the kanban column map
                this.kanbanColumn[idx] = { title: col.title, tasks, color: col.color, isAddTask: false }
            })
        },
        onOpenTask(columnTitle) {
            this.kanbanColumn.forEach(col => col.isAddTask = false)
            this.kanbanColumn.find(col => col.title === columnTitle).isAddTask = true
        },
        async onAddTask(columnTitle) {
            const currBoard = this.$store.getters.getCurrBoard;
            const groupId = currBoard.groups[0].id;
            const taskTitle = this.$refs[columnTitle][0].value
            this.$refs[columnTitle][0].value = ''

            await this.$store.dispatch({
                type: "addNewTask",
                payload: {
                    taskTitle,
                    status: columnTitle,
                    groupId
                },
            });
            this.setKanbanColumn()
        },
        setSelectedColumns(selectedCols) {
            this.cardColumns = selectedCols
        },
        setFilterBy(filterBy) {

            this.filterBy = filterBy
            this.setKanbanColumn()
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
        onColumnDrop(dropResult) {
            var kanbanColumn = JSON.parse(JSON.stringify(this.kanbanColumn))
            kanbanColumn = this.applyDrag(kanbanColumn, dropResult)
            this.kanbanColumn = kanbanColumn
        },
        async onTaskDrop(columnTitle, dropResult) {

            if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
                const kanbanColumn = JSON.parse(JSON.stringify(this.kanbanColumn))
                const column = kanbanColumn.filter(column => column.title === columnTitle)[0]
                const columnIdx = kanbanColumn.findIndex(currColumn => currColumn.title === column.title)

                const newColumn = JSON.parse(JSON.stringify(column))
                newColumn.tasks = this.applyDrag(newColumn.tasks, dropResult)
                // console.log(newColumn);

                kanbanColumn.splice(columnIdx, 1, newColumn)

                this.kanbanColumn = kanbanColumn
            }

            if (dropResult.addedIndex !== null && dropResult.removedIndex === null) {
                // console.log(columnTitle, dropResult);    
                await this.$store.dispatch({
                    type: "updateCurrBoard",
                    groupId: dropResult.payload.groupId,
                    taskId: dropResult.payload.content.id,
                    prop: this.filterBy,
                    toUpdate: columnTitle,
                })
                this.setKanbanColumn()
            }

        },
        getTaskPayload(columnTitle) {
            return index => {
                return this.kanbanColumn.filter(column => column.title === columnTitle)[0].tasks[index]
            }
        },
        applyDrag(arr, dragResult) {
            const { removedIndex, addedIndex, payload } = dragResult
            if (removedIndex === null && addedIndex === null) return arr

            const result = [...arr]
            let itemToAdd = payload

            if (removedIndex !== null) {
                itemToAdd = result.splice(removedIndex, 1)[0]
            }

            if (addedIndex !== null) {
                result.splice(addedIndex, 0, itemToAdd)
            }

            return result
        }
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

<style>
.smooth-dnd-container.horizontal {
    display: flex !important;
}
</style>