<template>
    <div :class="getFocusClass" @click="setFocus">
        <div className=" color-icon color-btn" :style="{ background: groupInfo.color }"
            @click.stop.prevent="(this.isColorPickOpen = !this.isColorPickOpen)"></div>
        <div class="title-input" contenteditable @blur="onChangeGroupTitle" :style="{ color: groupInfo.color }">{{
                groupInfo.title
        }}</div>
        <div class="tasks-count">{{ groupInfo.tasks.length }} Tasks</div>
    </div>

    <el-collapse-transition>
        <div class="color-picker" v-if="isOpen">
            <color-picker @update="onChangeGroupColor($event)" />
        </div>
    </el-collapse-transition>

</template>
  
<script>
import colorPicker from './color-picker.vue'
export default {
    name: "title-content",
    props: {
        groupInfo: Object,
    },
    data() {
        return {
            isColorPickOpen: false,
            isFocused: false
        }
    },
    methods: {
        onChangeGroupTitle(ev) {
            this.isFocused = false
            this.$emit('update', { prop: 'title', toUpdate: ev.target.innerText })
        },
        onChangeGroupColor({ toUpdate }) {
            this.isColorPickOpen = !this.isColorPickOpen
            this.isFocused = !this.isFocused
            this.$emit('update', { prop: 'color', toUpdate })
        },
        setFocus() {
            this.isFocused = !this.isFocused
        }
    },
    computed: {
        getFocusClass() {
            var currClass = 'flex align-center title-wrapper sticky forth'
            return (this.isFocused ? currClass + ' focused' : currClass)
        },
        isOpen() {
            return this.isColorPickOpen
        }
    },
    components: {
        colorPicker
    },
    emits: ["update", "collapse"],
}
</script>