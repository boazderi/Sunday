<template>
    <div class="text">
        <div contenteditable @blur="onChangeTaskText">{{ info }}</div>
    </div>
</template>
  
<script>
export default {
    name: "text",
    props: {
        info: String,
    },
    data() {
        return {};
    },
    methods: {
        onChangeTaskText(ev) {
            // this.$emit('update', { prop: 'taskTitle', toUpdate: ev.target.innerText })
        }
    }
}
</script>