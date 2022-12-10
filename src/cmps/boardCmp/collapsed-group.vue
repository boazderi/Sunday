<template>
    <section class="collapsed-group group-grid">
        <div class="more sticky first" @click="toggleDropdown">
            <span class="svg" v-icon="'more'"></span>
        </div>
        <div class="task-border sticky second rad-tl-6 rad-bl-6" :style="{ 'background-color': groupInfo.color }" />
        <div class="arrow sticky third" @click="this.$emit('collapse', { groupId: groupInfo.id })">
            <svg viewBox="0 0 20 20" :fill="groupInfo.color" width="24" height="24">
                <path
                    d="M12.5303 9.46967L12 10L12.5303 10.5303C12.8232 10.2374 12.8232 9.76256 12.5303 9.46967ZM10.9393 10L7.46967 13.4697C7.17678 13.7626 7.17678 14.2374 7.46967 14.5303C7.76256 14.8232 8.23744 14.8232 8.53033 14.5303L12.5303 10.5303L12 10L12.5303 9.46967L8.53033 5.46967C8.23744 5.17678 7.76256 5.17678 7.46967 5.46967C7.17678 5.76256 7.17678 6.23744 7.46967 6.53033L10.9393 10Z"
                    :fill="groupInfo.color"></path>
            </svg>
        </div>
        <title-content :groupInfo="groupInfo" @update="update" />
        <component v-for="(cell, idx) in getProgLineOrder" :key="idx" :is="cell" :group="groupInfo" class="cell" />
    </section>
    <group-title-dropdown :group="groupInfo" v-if="isDropOpen" :class="isDrop"
        @collapse="this.$emit('collapse', { groupId: groupInfo.id })" />
</template>
  
<script>
import side from "../dynamicCmp/side.vue"
import titleContent from "./title-content.vue"
import statusProgress from "./status-progress.vue"
import priorityProgress from "./priority-progress.vue"
import timelineWidth from "../boardCmp/timeline-width.vue"
import groupTitleDropdown from './group-title-dropdown.vue'

import { eventBus } from '../../services/event-bus.service.js'

export default {
    name: "collapsed-group",
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
        getProgLineOrder() {
            return this.$store.getters.getProgLineOrder
        },
        isDrop() {
            return { isDropOpen: this.isDropOpen }
        },
    },
    components: {
        side,
        titleContent,
        statusProgress,
        priorityProgress,
        timelineWidth,
        groupTitleDropdown,
    },
    emits: ["update", "collapse"],
}
</script>