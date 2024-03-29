<template>
  <section class="collapse-container" v-if="groupInfo.isCollapse">
    <collapsed-group :groupInfo="groupInfo" @collapse="collapseGroup" @update="updateTask" />
  </section>
  <section v-else class="group-container">
   
     <groupTitle :groupInfo="groupInfo" @update="updateTask" @collapse="collapseGroup" />

    <section class="group-content" v-click-outside-element="updateActiveTask">

      <!-- render group labels by labels array -->
      <section class="group-grid labels-grid">
        <div class="empty sticky first"></div>
        <div class="task-border sticky second rad-tl-6" :style="{ 'background-color': groupInfo.color }"></div>
        <div class="sticky third cell1">
          <input ref="checkbox" type="checkbox" class="checkbox " @change="setAllTasksInContext" />
        </div>
        <div class="sticky forth cell1"> Tasks</div>
        <Container orientation="horizontal" @drop="onColumnDrop($event)" :drop-placeholder="{
          className: 'drop-placeholder1',
          animationDuration: '200',
          showOnTop: true
        }">
          <Draggable v-for="(label, idx) in getLabels" :key="idx" :class="labelClass(label)">
            {{ label }}
          </Draggable>
        </Container>

      </section>

      <!-- render grid cells by cmpOrder array -->
      <Container @drop="(e) => onTaskDrop(groupInfo.id, e)" group-name="task-item"
        :shouldAcceptDrop="(e, payload) => (e.groupName === 'task-item')" orientation="vertical"
        :get-child-payload="getTaskPayload(groupInfo.id)" :drop-placeholder="{
          className: 'drop-placeholder',
          animationDuration: '200',
          showOnTop: true
        }" drag-class="on-drag">
        <Draggable v-for="task in groupTasks" :key="task.id" >
          <section class="group-grid task-row"  @click="updateActiveTask(task.id)" :class="{'active-row': activeTaskId === task.id}">

            <div class="more sticky">
              <span class="svg" v-icon="'more'"></span>
            </div>
            <div class="task-border sticky" :style="{ 'background-color': groupInfo.color }"></div>
            <side :groupId="groupId" :taskId="task.id" :color="groupInfo.color"></side>

            <task-title :info="task" @update="updateTask($event, task.id)" />
            <component v-for="(cmp, idx) in getCmpOrder" :key="idx" :is="cmp" :info="task" :group="groupInfo"
              @update="updateTask($event, task.id)" @click="updateActiveTask(task.id)" />
          </section>
        </Draggable>
      </Container>

      <!-- CRUD-ADD TASK -->
      <section class="add-task group-grid">
        <div class="empty sticky first"></div>
        <div class="task-border sticky second add-task rad-bl-6" :style="{ 'background-color': groupInfo.color }"></div>
        <div class="cell1 sticky third">
          <input type="checkbox" class="checkbox" disabled />
        </div>
        <div class="input-wrapper cell1 sticky forth">
          <input ref="addTask" @blur="onAddTask" class="flex align-center" type="text" placeholder="+ Add task" />
        </div>
      </section>

      <!--  progress by progress array -->
      <section class="progress-grid group-grid">
        <div v-for="pos in positions" :class="['sticky', 'empty', pos]" :key="pos"></div>
        <component v-for="(cell, idx) in getProgLineOrder" :key="idx" :is="cell" :group="groupInfo" class="cell" />
      </section>
    </section>
  </section>

</template>
  
<script>
import taskTitle from "../dynamicCmp/task-title.vue";
import side from "../dynamicCmp/side.vue";
import members from "../dynamicCmp/members.vue";
import date from "../dynamicCmp/date.vue";
import status from "../dynamicCmp/status.vue";
import priority from "../dynamicCmp/priority.vue";
import file from "../dynamicCmp/file.vue"
import textNote from "../dynamicCmp/text-note.vue"
import groupTitle from "./group-title.vue";
import statusProgress from "./status-progress.vue"
import priorityProgress from "./priority-progress.vue"
import timelineWidth from "../boardCmp/timeline-width.vue";
import timeline from "../dynamicCmp/timeline.vue";
import collapsedGroup from "./collapsed-group.vue";
import { Container, Draggable } from "vue3-smooth-dnd"

import { eventBus } from "../../services/event-bus.service";

export default {
  name: "group-list",
  props: {
    groupInfo: Object,
  },
  created() {
    eventBus.on("duplicateGroup", this.duplicateGroup)
    eventBus.on("deleteGroup", this.deleteGroup)
    eventBus.on('addGroup',this.addGroup)
    this.groupId = this.groupInfo.id
    this.cmpOrder = this.$store.getters.getCmpOrder
    this.labels = this.$store.getters.getLabels
    this.progLineOrder = this.$store.getters.getProgLineOrder
  },
  data() {
    return {
      groupTasks: this.groupInfo.tasks,
      activeTaskId: '',
      cmpOrder: [],
      labels: [],
      progLineOrder: [],
      // helper for progressRow
      positions: ['first', 'second', 'third', 'forth'],
      groupId: null,
      isCollapse: false
    }
  },
  methods: {
    updateTask({ prop, toUpdate }, taskId) {
      this.$store.dispatch({
        type: "updateCurrBoard",
        groupId: this.groupInfo.id,
        taskId,
        prop,
        toUpdate,
      })
    },
    // TODO-make it work for enter and blur but not both-get
    updateActiveTask(taskId){
      if(typeof taskId === 'string' && this.activeTaskId !== taskId){
        this.activeTaskId = taskId
      } else{
        this.activeTaskId = ''
      }
    },
    onAddTask() {
      this.$store.dispatch({
        type: "addNewTask",
        payload: {
          taskTitle: this.$refs.addTask.value,
          groupId: this.groupInfo.id,
        },
      });
      this.$refs.addTask.value = "";
    },
    async duplicateGroup(groupId) {
      await this.$store.dispatch({
        type: "duplicateGroup",
        payload: { groupId },
      });
      eventBus.emit("closeGroupDropdown")
    },
    async deleteGroup(groupId) {
      await this.$store.dispatch({ type: "deleteGroup", payload: { groupId } });
      eventBus.emit("closeGroupDropdown")
    },
    collapseGroup({ groupId }) {
      this.$store.dispatch({ type: "collapseGroup", payload: { groupId } });
      eventBus.emit("closeGroupDropdown")
    },
    async addGroup() {
      await this.$store.dispatch({ type: 'addGroup' })
      eventBus.emit("closeGroupDropdown")
    },
    setAllTasksInContext() {
      const payload = {
        tasks: this.groupInfo.tasks,
        isSelected: this.$refs.checkbox.checked,
      };
      const payload2 = {
        groupId: this.groupId,
        isSelected: this.$refs.checkbox.checked,
      }
      
      eventBus.emit("setAllTaskInContext", payload);
      eventBus.emit("toggleAllTasksCheckbox", payload2);
    },
    onColumnDrop(dropResult) {
      var draggedLabels = JSON.parse(JSON.stringify(this.labels))
      draggedLabels = this.applyDrag(draggedLabels, dropResult)
      this.labels = draggedLabels
      this.$store.dispatch({ type: 'updateDraggedItems', labels: this.labels })
    },
    onTaskDrop(groupId, dropResult) {
      this.groupTasks = this.applyDrag(this.groupTasks, dropResult)

      this.$store.dispatch({
        type: 'updateDraggedItems',
        groupId: this.groupInfo.id,
        tasksToUpdate: this.groupTasks
      })
    },
    getTaskPayload(groupId) {
      return index => {
        const currBoard = this.$store.getters.getCurrBoard
        return currBoard.groups.filter(group => group.id === groupId)[0].tasks[index]
      }
    },
    onGroupDrop(dropResult){
      console.log(dropResult)
    },

    log(...params) {
      console.log(...params)
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
    },
    labelClass(label) {
      // return (label === 'Timeline') ? 'cell1 wide-cell label' : 'cell1 label'
      return 'cell1 label'
    },

  },
  computed: {
    getCmpOrder() {
      return this.$store.getters.getCmpOrder
    },
    getLabels() {
      return this.$store.getters.getLabels
    },
    getProgLineOrder() {
      return this.$store.getters.getProgLineOrder
    },
  },
  watch: {
    groupInfo: {
      handler() {
        this.groupTasks = this.groupInfo.tasks
      },
      deep: true,
    },
  },
  emits: ["collapse"],
  components: {
    side,
    taskTitle,
    members,
    date,
    status,
    priority,
    textNote,
    groupTitle,
    Draggable,
    Container,
    statusProgress,
    priorityProgress,
    timeline,
    file,
    timelineWidth,
    collapsedGroup
  },
}
</script>
<!-- drag-class="bg-primary dark:bg-primary border-2 border-primary-hover text-white transition duration-100 ease-in z-50transform rotate-6 scale-110" -->