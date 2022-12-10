<template>
  <section class="members-picker-container">
    <div class="arrow-up-div members-arrow"></div>
    <section class="task-members flex">
      <div
        v-for="(member, idx) in task.members"
        :key="idx"
        class="task-member flex"
      >
        <member-preview class="members-picker-preview" :member="member" />
        <span class="member-fullname"> {{ member.fullname }} </span>
        <span class="delete-member" @click="onRemoveMember(member.id)">x</span>
      </div>
    </section>
    <input
      class="members-picker-input"
      type="text"
      placeholder="Search names, roles or teams"
      v-model="filterBy.txt"
    />
    <!-- <input type="text" /> -->
    <section v-if="boardMembers.length" class="suggested-people flex flex-col">
      <div class="suggested-members-txt">Suggested people</div>
      <div
        class="members-picker-suggestions outboard-hover flex"
        v-for="(member, idx) in suggestedPeople"
        :key="idx"
        @click="onAddMember(member)"
      >
        <member-preview class="members-picker-preview" :member="member" />
        <span class="member-fullname"> {{ member.fullname }} </span>
      </div>
    </section>
  </section>
</template>
  
<script>
import memberPreview from "./../member-preview.vue";

export default {
  name: "members-picker",
  props: {
    task: Object,
  },
  data() {
    return {
      filterBy: {
        txt: "",
      },
    };
  },
  methods: {
    onRemoveMember(memberId) {
      var taskMembers = JSON.parse(JSON.stringify(this.task.members)); //DEEP COPY TO RETURN THE UPDATED MEMBERS ARRAY
      const idx = taskMembers.findIndex(
        (taskMember) => taskMember.id === memberId
      );
      taskMembers.splice(idx, 1);
      this.$emit("update", { toUpdate: taskMembers });
    },
    onAddMember(member) {
      var taskMembers = JSON.parse(JSON.stringify(this.task.members)); //DEEP COPY TO RETURN THE UPDATED MEMBERS ARRAY
      taskMembers.push(member);
      this.$emit("update", { toUpdate: taskMembers });
    },
  },
  computed: {
    suggestedPeople() {
      var members = this.boardMembers.filter((boardMember) => {
        return !this.task.members.some(
          (taskMember) => boardMember.id === taskMember.id
        )
      })
        if (this.filterBy.txt) {
        const regex = new RegExp(this.filterBy.txt, "i");
        members = members.filter((member) => regex.test(member.fullname));
      }
      return members;
    },
    boardMembers() {
      const board = this.$store.getters.getCurrBoard;
      return board.members;
    },
  },
  emits: ["update"],
  components: {
    memberPreview,
  },
};
</script>