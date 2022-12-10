<template>
    <section class="status-progress">
        <div v-if="group.isCollapse">Status</div>
        <div class="bar-container flex align-center">
            <div v-if="progressMap.Done" class="done" :style="{ 'flex-basis': `${progressMap.Done.percent}%` }"></div>
            <div v-if="progressMap.Working" class="working-on-it"
                :style="{ 'flex-basis': `${progressMap.Working.percent}%` }"></div>
            <div v-if="progressMap.Stuck" class="stuck" :style="{ 'flex-basis': `${progressMap.Stuck.percent}%` }">
            </div>
            <div v-if="progressMap.Empty" class="empty" :style="{ 'flex-basis': `${progressMap.Empty.percent}%` }">
            </div>

        </div>
    </section>
</template>

<script>

export default {
    data() {
        return {
            progressMap: null,
            groupCmp: null
        }
    },
    props: {
        group: Object
    },
    created() {
        this.groupCmp = this.group
        this.setProgressMap()
    },
    methods: {
        setProgressMap() {
            const tasks = this.groupCmp.tasks
            var progressMap = {}
            tasks.forEach(task => {
                // if already exist
                if (progressMap[task.status]) progressMap[task.status].count++
                else {
                    progressMap[task.status] = {}
                    progressMap[task.status].count = 1
                }
                progressMap[task.status].percent = (progressMap[task.status].count / tasks.length) * 100
            })
            this.progressMap = progressMap
        }
    },
    watch: {
        group: {
            handler() {
                this.groupCmp = this.group
                this.setProgressMap()
            },
            deep: true
        }
    }

}
</script>
