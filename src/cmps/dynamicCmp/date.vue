<template>
    <section class="date">
        <p>{{ info }}</p>
    </section>
</template>
  
<script>
export default {
    name: "date",
    emits: ["update"],
    props: {
        info: String,
    },
};
</script>