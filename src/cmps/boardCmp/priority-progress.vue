<template>
    <section class="priority-progress">
        <div class="bar-container flex align-center">
            <div v-if="progressMap.LOW" class="low" :style="{ 'flex-basis': `${progressMap.LOW.percent}%` }"></div>
            <div v-if="progressMap.CRITICAL" class="critical"
                :style="{ 'flex-basis': `${progressMap.CRITICAL.percent}%` }"></div>
            <div v-if="progressMap.EMPTY" class="empty" :style="{ 'flex-basis': `${progressMap.EMPTY.percent}%` }">
            </div>
            <div v-if="progressMap.MEDIUM" class="medium" :style="{ 'flex-basis': `${progressMap.MEDIUM.percent}%` }">
            </div>
            <div v-if="progressMap.HIGH" class="high" :style="{ 'flex-basis': `${progressMap.HIGH.percent}%` }"></div>
        </div>

    </section>
</template>

<script>
export default {
    props: {
        group: Object
    },
    data() {
        return {
            progressMap: null,
            groupCmp: null
        }
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
                if (progressMap[task.priority]) progressMap[task.priority].count++
                else {
                    progressMap[task.priority] = {}
                    progressMap[task.priority].count = 1
                }
                progressMap[task.priority].percent = (progressMap[task.priority].count / tasks.length) * 100

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



