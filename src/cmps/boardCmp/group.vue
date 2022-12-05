<template>
  <section class="group-container">
    <groupTitle :groupInfo="groupInfo" @update="updateTask" />
    <section class="group-content">
      <!-- render group labels by labels array -->
      <section class="group-grid labels-grid">
        <div class="empty"></div>
        <div
          class="task-border rad-tl-6"
          :style="{ 'background-color': groupInfo.color }"
        ></div>
        <div class="cell">
          <input
            ref="checkbox"
            type="checkbox"
            class="checkbox"
            @change="setAllTasksInContext"
          />
        </div>
        <div class="cell" v-for="(label, idx) in labels" :key="idx">
          {{ label }}
        </div>
      </section>

      <!-- render grid cells by cmpOrder array -->
      <draggable
        v-model="groupTasks"
        v-bind="dragOptions"
        item-key="order"
        @change="log"
      >
        <template #item="{ element }">
          <section class="group-grid task-row">
            <!-- todo-put in each cmp the cell class jsut if necc -->
            <div class="more">
              <span class="svg" v-icon="'more'"></span>
            </div>
            <div
              class="task-border"
              :style="{ 'background-color': groupInfo.color }"
            ></div>
            <side
              class="cell"
              :groupId="groupId"
              :taskId="element.id"
              :color="groupInfo.color"
            ></side>
            <!-- todo adjust the architecture of the cell wrapper section and resolve the problem  -->
            <!-- :class="['cell', cmp]" -->
            <section class="cell" v-for="(cmp, idx) in cmpOrder" :key="idx">
              <component
                :is="cmp"
                :info="element"
                @update="updateTask($event, element.id)"
              />
            </section>
          </section>
        </template>
      </draggable>

      <!-- CRUD-ADD TASK -->
      <section class="add-task group-grid">
        <div class="empty"></div>
        <div
          class="task-border add-task rad-bl-6"
          :style="{ 'background-color': groupInfo.color }"
        ></div>
        <div class="cell">
          <input type="checkbox" class="checkbox" disabled />
        </div>
        <div class="input-wrapper flex align-center">
          <input
            ref="addTask"
            @blur="onAddTask"
            class="flex align-center"
            type="text"
            placeholder="+ Add task"
          />
        </div>
      </section>

      <!-- todo change to progress func -->
      <!--  progress by progress array -->
      <section class="progress-grid group-grid">
        <div v-for="n in 4" class="empty" :key="n"></div>

        <status-progress class="cell" :group="groupInfo"></status-progress>
        <div class="cell"></div>
        <priority-progress class="cell" :group="groupInfo"></priority-progress>
        <div class="cell" v-for="n in 3" :key="n"></div>
      </section>
    </section>
  </section>
</template>
  
<script>
import taskTitle from "../dynamicCmp/taskTitle.vue";
import side from "../dynamicCmp/side.vue";
import members from "../dynamicCmp/members.vue";
import date from "../dynamicCmp/date.vue";
import status from "../dynamicCmp/status.vue";
import priority from "../dynamicCmp/priority.vue";
import textNote from "../dynamicCmp/text.vue";
import timeline from "../dynamicCmp/timeline.vue";
import groupTitle from "./group-title.vue";
import statusProgress from "./status-progress.vue";
import priorityProgress from "./priority-progress.vue";
import draggable from "vuedraggable";

import { eventBus } from "../../services/event-bus.service";

export default {
  name: "group-list",
  props: {
    groupInfo: Object,
  },
  data() {
    return {
      groupTasks: this.groupInfo.tasks,
      cmpOrder: [
        "taskTitle",
        "status",
        "members",
        "priority",
        "date",
        "textNote",
        "file",
        "timeline",
      ],
      labels: [
        "Tasks",
        "Status",
        "Person",
        "Priority",
        "Date",
        "Text",
        "File",
        "Timeline",
      ],
      groupId: null,
    };
  },
  created() {
    eventBus.on("duplicateGroup", this.duplicateGroup);
    eventBus.on("deleteGroup", this.deleteGroup);
    this.groupId = this.groupInfo.id;
  },
  methods: {
    updateTask({ prop, toUpdate }, taskId) {
      this.$store.dispatch({
        type: "updateCurrBoard",
        groupId: this.groupInfo.id,
        taskId,
        prop,
        toUpdate,
      });
    },
    // TODO-make it work for enter and blur but not both-get
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
      eventBus.emit("closeGroupDropdown");
    },
    async deleteGroup(groupId) {
      await this.$store.dispatch({ type: "deleteGroup", payload: { groupId } });
      eventBus.emit("closeGroupDropdown");
    },
    setAllTasksInContext() {
      const payload = {
        tasks: this.groupInfo.tasks,
        isSelected: this.$refs.checkbox.checked,
      };
      eventBus.emit("setAllTaskInContext", payload);

      eventBus.emit("toggleAllTasksCheckbox", this.groupId);
    },
    log: function (evt, arr) {
      this.$store.dispatch({
        type: "updateDraggedGroup",
        groupId: this.groupInfo.id,
        toUpdate: this.groupTasks,
      });
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  watch: {
    groupInfo: {
      handler() {
        this.groupTasks = this.groupInfo.tasks;
      },
      deep: true,
    },
  },
  components: {
    side,
    taskTitle,
    members,
    date,
    status,
    priority,
    textNote,
    groupTitle,
    draggable,
    statusProgress,
    priorityProgress,
    timeline,
  },
};
</script>