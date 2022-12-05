<template>
    <section class="cell2">
        <div class="task-text flex align-center center" contenteditable @blur="onChangeTaskText">
        {{ info.textNote || '&nbsp;' }}
        </div>
    </section>
</template>
  
<script>
export default {
    name: "text-note",
    props: {
        info: Object,
    },
    data() {
        return {
            isActive: false
        };
    },
    mounted(){
    },
    methods: {
        onChangeTaskText(ev) {
            this.$emit('update', { prop: 'textNote', toUpdate: ev.target.innerText })
        }
    }
}
</script>