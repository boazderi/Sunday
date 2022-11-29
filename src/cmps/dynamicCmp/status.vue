<template>
    <p class="status">{{ info }}</p>
</template>
  
<script>
export default {
    name: "status",
    props: {
        info: String,
    },
};
</script>
  
<style>
.status {
    background-color: lightpink;
    height: 100%;
}
</style>