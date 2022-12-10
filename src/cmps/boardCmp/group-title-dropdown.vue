<template>
  <section class="group-title-dropdown flex column align-center">
    <!-- <el-card> -->
      <div class="flex align-center action" v-for="(groupOpt, index) in groupOpts" :key="groupOpt"
        @click="setActionByCase(groupOpt.type)">
        <span class="svg" v-icon="icons[index]"></span>
        <span class="desc flex align-center">{{ groupOpt.desc }}</span>
      </div>
    <!-- </el-card> -->
  </section>
</template>

<script>
import { eventBus } from '../../services/event-bus.service.js'

export default {
  props: {
    group: Object
  },
  data() {
    return {
      // TODO add collapse all groups
      groupOpts: [{
        desc: this.group.isCollapse ? 'Expand this group' : 'Collapse this group'
        , type: 'collapse'
      },
      { desc: "Duplicate this group", type: 'duplicate' },
      { desc: "Delete", type: 'delete' }],
      icons: ['collapse', 'duplicateGrp', 'deleteGrp']
    }
  },
  methods: {
    setActionByCase(type) {
      switch (type) {
        case 'duplicate':
          eventBus.emit('duplicateGroup', this.group.id)
          break;

        case 'delete':
          eventBus.emit('deleteGroup', this.group.id)
          break;

        case 'collapse':
          this.$emit('collapse')
          // eventBus.emit('collapseGroup', { groupId: this.group.id })
          break;
      }
    }
  },

}
</script>


