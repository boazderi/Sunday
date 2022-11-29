<template>
    <section class="members-list">
        <member-preview v-for="(member, idx) in info" :key="idx" :member="member" />
    </section>
</template>
  
<script>
import memberPreview from "./../member-preview.vue";
export default {
    name: "members",
    emits: ["update"],
    props: {
        info: Array,
    },

    components: {
        memberPreview,
    },
};
</script>
  
<style >
p {
    margin: 0;
}

.members-list {
    display: inline-flex;
    justify-items: center;
    flex-direction: row;
    background-color: lightseagreen;
    width: 100%;
    display: flex;
    justify-content: center;
}

.members {
    background-color: lightseagreen;
}
</style>