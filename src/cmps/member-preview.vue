<template>
    <div v-if="member && member.imgUrl" :style="{ 'background-image': 'url(' + member.imgUrl + ')' }"
        class="member-preview" @click="print">
    </div>
    <div v-else :style="{ 'background-color': '#8338ec' }" class="member-preview" @click="print">
        {{ member?.fullname?.substring(0, 1).toUpperCase() }}
    </div>
</template>
  
<script>
export default {
    name: "member-preview",
    props: {
        member: Object,
    },
    // created(){
    //     console.log(member?)
    // },
    computed: {
        memberColor() {
            return this.member.color
        },
    },
}
</script>