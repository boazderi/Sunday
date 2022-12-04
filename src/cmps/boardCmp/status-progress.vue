<template>
    <section class="status-progress">
        <div class="bar-container flex align-center">
            <div v-if="progressMap.Done" class="done" 
            :style="{ 'flex-basis': `${progressMap.Done.percent}%` }"></div>
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
            })

            for (const status in progressMap) {
                progressMap[status].percent = (progressMap[status].count / tasks.length) * 100
            }
            this.progressMap = progressMap
        }
    },
    watch: {
        group: {
            handler() {
                this.groupCmp = this.group
                console.log(this.groupCmp.tasks)
                this.setProgressMap()
            },
            deep: true
        }
    }

}
</script>

<style>
/* $bg-status-done: rgb(0, 200, 117);
$bg-status-working: rgb(253, 171, 61);
$bg-status-stuck: rgb(226, 68, 92);
$bg-status-empty: #c3c4c3; */
</style>