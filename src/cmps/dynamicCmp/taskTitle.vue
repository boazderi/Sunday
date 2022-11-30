<template>
    <div class="title">
        <input type="checkbox" />
        <div contenteditable @input="onChangeTaskTitle">{{ info }}</div>
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
  
<style>
.title {
    /* text-align: start; */
    background-color: lightblue;
    display: flex;
}
</style>