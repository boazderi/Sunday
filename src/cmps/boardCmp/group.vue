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
          <input type="checkbox" class="checkbox" />
        </div>
        <div class="cell" v-for="(label, idx) in labels" :key="idx">
          {{ label }}
        </div>
      </section>

      <!-- render grid cells by cmpOrder array -->
      <draggable
        v-model="dragList"
        item-key="order"
        v-bind="dragOptions"
        @change="log($event, dragList)"
        @start="drag = true"
        @end="drag = false"
      >
        <template #item="{ element }">
          <div class="group-grid task-row dragg-grid">
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
              :taskId="element.id"
              :color="groupInfo.color"
            ></side>

            <section class="cell" v-for="(cmp, idx) in cmpOrder" :key="idx">
              <component
                :is="cmp"
                :info="element[cmp]"
                @update="updateTask($event, element.id)"
              />
            </section>
          </div>
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
            placeholder="+ Add item"
          />
        </div>
      </section>

      <!-- todo change to progress func -->
      <!--  progress by progress array -->
      <section class="progress-grid group-grid">
        <div v-for="n in 4" class="empty" :key="n"></div>
        <div class="cell" v-for="(item, idx) in progress" :key="idx">
          {{ item }}
        </div>
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
import groupTitle from "./group-title.vue";
import bottomCrud from "./bottom-crud.vue";
import { eventBus } from "../../services/event-bus.service";
import draggable from "vuedraggable";

export default {
  name: "group-list",
  props: {
    groupInfo: Object,
  },
  data() {
    return {
      dragList: this.groupInfo.tasks,
      drag: false,
      cmpOrder: [
        "taskTitle",
        "status",
        "members",
        "priority",
        "date",
        "text",
        "file",
      ],
      labels: ["Items", "Status", "Person", "Priority", "Date", "Text", "File"],
      progress: ["status", "", "priority", "", "", ""],
    };
  },
  created() {
    eventBus.on("duplicateGroup", this.duplicateGroup);
    eventBus.on("deleteGroup", this.deleteGroup);
    // console.log(this.groupInfo);
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
    sort() {
      this.list = this.list.sort((a, b) => a.order - b.order);
    },
    log: function (evt, arr) {
      window.console.log(evt);
      window.console.log(this.dragList);
    },
    onDrag: function (ev) {
      this.drag = true;
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
  components: {
    side,
    taskTitle,
    members,
    date,
    status,
    priority,
    groupTitle,
    bottomCrud,
    draggable,
  },
};
</script>

