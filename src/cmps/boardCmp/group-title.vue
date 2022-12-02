<template>
    <div class="group-title flex align-center">
        <group-title-dropdown :groupId="groupInfo.id" v-if="isDropOpen" :class="isDrop" />

        <div class="more" @click="toggleDropdown">
            <span class="svg" v-icon="'more'"></span>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" :fill="groupInfo.color">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
        </svg>
        <div class="title-input" contenteditable @blur="onChangeGroupTitle" :style="{ color: groupInfo.color }">{{
                groupInfo.title
        }}</div>
        <div class="tasks-count">{{ groupInfo.tasks.length }} Tasks</div>
        <button @click="(isModalOpen = !isModalOpen)">color</button>
        <div class="color-picker-modal" v-if="isModalOpen">
            <!-- <el-collapse-transition>
                <status-modal />
            </el-collapse-transition> -->
            <div style="margin-top: 20px; height: 200px">
                <!-- <el-collapse-transition> -->
                <div v-show="isModalOpen">
                    <color-picker />
                </div>
                <!-- </el-collapse-transition> -->
            </div>
        </div>
    </div>
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
            this.$emit('update', { prop: 'title', toUpdate: ev.target.innerText })
        },
        toggleDropdown() {
            this.isDropOpen = !this.isDropOpen
        },
        closeGroupDropdown() {
            this.isDropOpen = false
        }
    },
    computed: {
        isDrop() {
            return { isDropOpen: this.isDropOpen }
        }
    },
    components: {
        groupTitleDropdown,
        colorPicker
    }
}
</script>
<style>
.transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409eff;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
    position: absolute;
    z-index: 1000;
    display: block;

    /* background-color: #fff; */
    /* width: 180px;
    padding: .5rem;
    display: flex;
    flex-wrap: wrap;
    gap: .6rem;
    border: 1px #c3c6d4 solid;
    border-radius: 4px;
    position: absolute; */
    /* top: 1.95rem;
    left: -.3rem; */
    top: 25px;
    left: 474px;
}
</style>
