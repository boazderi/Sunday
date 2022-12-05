<template>

    <section class="kanban">
        <section class="kanban-content fully flex ">
            <section class="tasks-by-order" 
            v-for="(value) in statusMap" :key="value">
            <pre>{{value}}</pre>

        </section>

        </section>

        <kanban-filter></kanban-filter>
    </section>
</template>

<script>
import kanbanFilter from '../cmps/kanban-cmps/kanban-filter.vue'
export default {
    data() {
        return {
            orderBy: 'status',
            currentBoard: null,
            statusMap: { Working: [], Stuck: [], Done: [], Empty: [] }

        }
    },
    created() {
        this.currentBoard = this.$store.getters.getCurrBoard
        this.setStatusMap()
    },
    methods: {
        setStatusMap() {
            this.currentBoard.groups.forEach(group => {
                group.tasks.forEach(task => {
                    this.statusMap[task.status].push(task)
                })
            })
        }
    },
    components: {
        kanbanFilter
    }

}
</script>

