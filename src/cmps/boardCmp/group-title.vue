<template>
    <div class="group-title flex align-center">
        <group-title-dropdown :groupId="groupInfo.id" 
        v-if="isDropOpen" :class="isDrop"/>

        <div class="more" @click="toggleDropdown">
            <span class="svg" v-icon="'more'"></span>
        </div>

        <div v-icon="'arrowDownBlack'"></div>
        <div contenteditable @blur="onChangeGroupTitle">{{ groupInfo.title }}</div>
    </div>
</template>
  
<script>
import groupTitleDropdown from './group-title-dropdown.vue'
import { eventBus } from '../../services/event-bus.service.js'
export default {
    name: "group-title",
    props: {
        groupInfo: Object,
    },
    data() {
        return {
            isDropOpen: false
        };
    },
    created(){
        eventBus.on('closeGroupDropdown',this.closeGroupDropdown)
    },
    methods: {
        onChangeGroupTitle(ev) {
            this.$emit('update', { prop: 'title', toUpdate: ev.target.innerText })
        },
        toggleDropdown() {
            this.isDropOpen = !this.isDropOpen
        },
        closeGroupDropdown(){
            this.isDropOpen=false
        }

    },
    computed:{
        isDrop(){
            return {isDropOpen:this.isDropOpen}
        } 
    },
    components: {
        groupTitleDropdown
    }
}
</script>