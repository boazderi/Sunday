<template>
    <div class="group-title flex">
        <div class="more">
            <span class="svg" v-icon="'more'"></span>
        </div>
        <div contenteditable @input="onChangeGroupTitle">{{ groupInfo.title }}</div>
    </div>
</template>
  
<script>
export default {
    name: "group-title",
    props: {
        groupInfo: Object,
    },
    data() {
        return {};
    },
    methods: {
        onChangeGroupTitle(ev) {
            this.$emit('update', { prop: 'title', toUpdate: ev.target.innerText })
        }
    }
}
</script>