<template>
    <section class="group-grid group-title flex align-center">
        <div :class="getMoreClass" @click="toggleDropdown">
            <span class="svg" v-icon="'more'"></span>
        </div>
        <div class="task-border sticky second"></div>
        <div class="sticky third arrow-down" @click="this.$emit('collapse', { groupId: groupInfo.id })">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"
                :fill="groupInfo.color">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
            </svg>
        </div>
        <title-content :groupInfo="groupInfo" @update="update" />
    </section>
    <group-title-dropdown :group="groupInfo" v-if="isDropOpen" :class="isDrop"
        @collapse="this.$emit('collapse', { groupId: groupInfo.id })" />
</template>
  
<script>
import groupTitleDropdown from './group-title-dropdown.vue'
import titleContent from "./title-content.vue";

import { eventBus } from '../../services/event-bus.service.js'
export default {
    name: "group-title",
    props: {
        groupInfo: Object,
    },
    data() {
        return {
            isDropOpen: false,
        }
    },
    created() {
        eventBus.on('closeGroupDropdown', this.closeGroupDropdown)
    },
    methods: {
        toggleDropdown() {
            this.isDropOpen = !this.isDropOpen
        },
        closeGroupDropdown() {
            this.isDropOpen = false
        },
        update({ prop, toUpdate }) {
            this.$emit('update', { prop, toUpdate })
        },
    },
    computed: {
        getFocusClass() {
            var currClass = 'flex align-center title-wrapper sticky forth'
            return (this.isFocused ? currClass + ' focused' : currClass)
        },
        isDrop() {
            return { isDropOpen: this.isDropOpen }
        },
        getMoreClass() {
            var currClass = 'more sticky first'
            return (this.isDropOpen ? currClass + ' open' : currClass)
        }
    },
    components: {
        groupTitleDropdown,
        titleContent
    },
    emits: ["update", "collapse"],
}
</script>