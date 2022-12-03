<template>
    <section class="members-list" @click="(isListOpen = !isListOpen)">
        <span class="plusIcon" v-icon="'plus'"></span>
        <member-preview v-for="(member, idx) in info.members" :key="idx" :member="member" />
    </section>
    <el-collapse-transition>
        <div class="members-picker" v-if="isListOpen">
            <members-picker :task="info" @update="onChangeGroupMembers"></members-picker>
        </div>
    </el-collapse-transition>
</template>
  
<script>
import memberPreview from "./../member-preview.vue";
import membersPicker from "../boardCmp/members-picker.vue"
export default {
    name: "members",
    emits: ["update"],
    props: {
        info: Object,
    },
    data() {
        return {
            isListOpen: false
        }
    },
    methods: {
        onChangeGroupMembers({ toUpdate }) {
            this.$emit('update', { prop: 'members', toUpdate })
        }
    },
    components: {
        memberPreview,
        membersPicker
    },
};
</script>
  
<!-- <style >
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
</style> -->