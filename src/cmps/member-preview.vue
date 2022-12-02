<template>
    <div :style="{ 'background-image': `url(https://randomuser.me/api/portraits/men/22.jpg)` }" v-if="member"
        class="member-priview" @click="print">
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
    methods: {
        print() {
            console.log(this.member);
        }
    }
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
    background-size: cover;
    background-position: center;
}
</style>