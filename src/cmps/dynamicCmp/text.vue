<template>
    <section class="task-text-section">
        <div class="task-text" contenteditable @blur="onChangeTaskText">
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