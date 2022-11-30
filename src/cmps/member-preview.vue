<template>
    <div :style="{ background: memberColor }" v-if="member" class="member-priview">
        {{ member.fullname.substring(0, 1).toUpperCase() }}
    </div>
</template>
  
<script>
export default {
    name: "member-priview",
    props: {
        member: Object,
    },

    computed: {
        memberColor() {
            return this.member.color;
        },
    },
};
</script>
  
<style>
.member-priview {
    color: #fff;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-inline-start: -10px;
}
</style>