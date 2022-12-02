<template>
    <section class="date">
        <el-date-picker v-model="value" type="date" placeholder="Pick a day" format="MMM D" value-format="MMM-D"
            @blur="onChangeDate" />
    </section>
</template>
  
<script>
export default {
    name: "date",
    // emits: ["update"],
    props: {
        groupInfo: Object,
    },
    data() {
        return {
            value: ""
        };
    },
    methods: {
        onChangeDate(ev) {
            console.log(ev.target.value);
        }
    }
};
</script>