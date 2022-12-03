<template>
    <section class="date">
        <el-date-picker v-model="value" type="date" format="MMM D" value-format="MMM-D" @change="onChangeDate" />
    </section>
</template>
  
<script>
export default {
    name: "date",
    // emits: ["update"],
    props: {
        info: Object,
    },
    data() {
        return {
            value: this.info.date
        };
    },
    methods: {
        onChangeDate() {
            this.$emit('update', { prop: 'date', toUpdate: this.value })
        }
    }
};
</script>