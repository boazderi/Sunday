<template>
    <section class="priority">
        <p>{{ info }}</p>
    </section>
</template>
  
<script>
export default {
    name: "priority",
    props: {
        info: String,
    },
};
</script>
  
<style>
.priority {
    background-color: lightskyblue;
}
</style>