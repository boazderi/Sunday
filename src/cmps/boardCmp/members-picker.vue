<template>
    <section class="task-members">
        <member-preview v-for="(member, idx) in task.members" :key="idx" :member="member"
            @click="onRemoveMember(member.id)" />
    </section>
    <!-- <input type="text" /> -->
    <section v-if="boardMembers.length" class="suggested-people">
        <h3>Suggested people</h3>
        <member-preview v-for="(member, idx) in suggestedPeople" :key="idx" :member="member"
            @click="onAddMember(member)" />
    </section>
</template>
  
<script>
import memberPreview from "./../member-preview.vue";

export default {
    name: "members-picker",
    props: {
        task: Object,
    },
    methods: {
        onRemoveMember(memberId) {
            var taskMembers = JSON.parse(JSON.stringify(this.task.members)) //DEEP COPY TO RETURN THE UPDATED MEMBERS ARRAY
            const idx = taskMembers.findIndex(taskMember => taskMember.id === memberId)
            taskMembers.splice(idx, 1)
            this.$emit('update', { toUpdate: taskMembers })
        },
        onAddMember(member) {
            var taskMembers = JSON.parse(JSON.stringify(this.task.members)) //DEEP COPY TO RETURN THE UPDATED MEMBERS ARRAY
            taskMembers.push(member)
            this.$emit('update', { toUpdate: taskMembers })
        },
    },
    computed: {
        suggestedPeople() {
            return this.boardMembers.filter(boardMember => {
                return (!this.task.members.some(taskMember => boardMember.id === taskMember.id))
            })
        },
        boardMembers() {
            const board = this.$store.getters.getCurrBoard
            return board.members
        }
    },
    emits: ["update"],
    components: {
        memberPreview,
    },
}
</script>