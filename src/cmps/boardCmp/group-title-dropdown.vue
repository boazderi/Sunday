<template>
  <section class="group-title-dropdown flex column align-center">

    <el-card class="">
      <div class="flex align-center action" v-for="groupOpt in groupOpts" :key="groupOpt"
        @click="setActionByCase(groupOpt.type)">
        <span>{{ groupOpt.desc }}</span>
      </div>

    </el-card>
  </section>
</template>

<script>
import { eventBus } from '../../services/event-bus.service.js'

export default {
  props: {
    groupId: String
  },
  data() {
    return {
      groupOpts: [{ desc: 'Collapse this group', type: 'collapse' },
      { desc: "Duplicate this group", type: 'duplicate' },
      { desc: "Delete", type: 'delete' }],
    };
  },
  methods: {
    setActionByCase(type) {
      switch (type) {
        case 'duplicate':
          eventBus.emit('duplicateGroup', this.groupId)
          break;

        case 'delete':
        eventBus.emit('deleteGroup', this.groupId)
          break;

        case 'collapse':
        eventBus.emit('collapseGroup',this.groupId)
          break;
      }

    }

  },

}
</script>

<style>

</style>


     <!-- :class="{
          'status-done': statusOpt === 'Done',
          'status-working': statusOpt === 'Working on it',
          'status-stuck': statusOpt === 'Stuck',
          'status-empty': !statusOpt,
        }" -->