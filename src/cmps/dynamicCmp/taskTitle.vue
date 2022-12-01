<template>
    <div class="title">
        <div contenteditable @blur="onChangeTaskTitle">{{ info }}</div>
    </div>
</template>
  
<script>
export default {
    name: "task-title",
    props: {
        info: String,
    },
    data() {
        return {};
    },
    methods: {
        onChangeTaskTitle(ev) {
            this.$emit('update', { prop: 'taskTitle', toUpdate: ev.target.innerText })
        }
    }
}
</script>