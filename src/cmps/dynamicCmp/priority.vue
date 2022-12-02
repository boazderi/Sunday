<template>
    <section class="priority">
        <p>{{ info.priority }}</p>
    </section>
</template>
  
<script>
export default {
    name: "priority",
    props: {
        info: Object,
    },
};
</script>