<template>
    <section class="task-title cell1  space-between sticky">
        <div class="task-title-sub fully flex align-center space-between">
            <div class="flex align-center content-edit radius-4" contenteditable @blur="onChangeTaskTitle">
                {{ info.taskTitle }}
            </div>

            <span class="open-con flex align-center space-between radius-4" :style="{ color: `#323338` }"
                @click="goToConversation">
                <button class="svg" v-icon="'openArrow'"></button>
                open</span>
        </div>
        <!-- todo add counter to the numbers of comments in the conversation icon -->
        <div class="conversation-wrapper fully flex align-center center">
            <button v-if="!info.comments.length" class="svg" v-icon="'addConversation'" @click="goToConversation" />

            <div v-else class="already-written">
                <button class="svg" v-icon="'addConversation'" @click="goToConversation" />
                <div class="counter flex center align-center">{{ info.comments.length }}</div>
            </div>
        </div>
    </section>

</template>
  
<script>
export default {
    name: "task-title",
    props: {
        info: Object,
    },
    methods: {
        goToConversation() {
            const boardId = this.$route.params.id
            this.$router.push(`/board/${boardId}/main-table/pulses/${this.info.id}`)

        },
        onChangeTaskTitle(ev) {
            this.$emit('update', { prop: 'taskTitle', toUpdate: ev.target.innerText })
        }
    }
}
</script>