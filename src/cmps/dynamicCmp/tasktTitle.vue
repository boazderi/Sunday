<template>
    <div class="title">
        <input type="checkbox" />
        <p>{{ info }}</p>
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
};
</script>
  
<style>
.title {
    /* text-align: start; */
    background-color: lightblue;
    display: flex;
}
</style>