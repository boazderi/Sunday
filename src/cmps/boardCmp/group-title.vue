<template>
    <div class="group-grid group-title flex align-center">

        <div class="more" @click="toggleDropdown">
            <span class="svg" v-icon="'more'"></span>
        </div>
        <div class="empty"></div>

        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" :fill="groupInfo.color">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
        </svg>
        <div class="flex align-center title-wrapper">
            <div class="title-input" contenteditable @blur="onChangeGroupTitle" :style="{ color: groupInfo.color }">{{
                    groupInfo.title
            }}</div>
            <div class="tasks-count">{{ groupInfo.tasks.length }} Tasks</div>
        </div>

        <button @click="(isModalOpen = !isModalOpen)">color</button>
        <el-collapse-transition>
            <div class="color-picker" v-if="isOpen">
                <color-picker @update="onChangeGroupColor($event)"></color-picker>
            </div>
        </el-collapse-transition>

    </div>
    <group-title-dropdown :groupId="groupInfo.id" v-if="isDropOpen" :class="isDrop" />
</template>
  
<script>
import groupTitleDropdown from './group-title-dropdown.vue'
import colorPicker from './color-picker.vue'
import { eventBus } from '../../services/event-bus.service.js'
export default {
    name: "group-title",
    props: {
        groupInfo: Object,
    },
    data() {
        return {
            isDropOpen: false,
            isModalOpen: false
        };
    },
    created() {
        eventBus.on('closeGroupDropdown', this.closeGroupDropdown)
    },
    methods: {
        onChangeGroupTitle(ev) {
            this.isModalOpen = !this.isModalOpen
            this.$emit('update', { prop: 'title', toUpdate: ev.target.innerText })
        },
        toggleDropdown() {
            this.isDropOpen = !this.isDropOpen
        },
        closeGroupDropdown() {
            this.isDropOpen = false
        },
        onChangeGroupColor({ toUpdate }) {
            this.$emit('update', { prop: 'color', toUpdate })
        }
    },
    computed: {
        isDrop() {
            return { isDropOpen: this.isDropOpen }
        },
        isOpen() {
            return this.isModalOpen
        }
    },
    components: {
        groupTitleDropdown,
        colorPicker
    },
    emits: ["update"],
}
</script>