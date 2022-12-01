<template>
    <div class="file">
        <div>{{ info }}</div>
    </div>
</template>
  
<script>
export default {
    name: "file",
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