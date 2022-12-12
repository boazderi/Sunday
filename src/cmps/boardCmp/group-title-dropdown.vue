<template>
  <section class="group-title-dropdown flex column align-center">

    <div class="wrapper1">
      <div class="flex align-center action" v-for="(groupOpt, index) in groupOpts" :key="groupOpt"
        @click="setActionByCase(groupOpt.type)">
        <span class="svg" v-icon="icons[index]"></span>
        <span class="desc flex align-center">{{ groupOpt.desc }}</span>
      </div>

    </div>

    <div class="border"></div>

    <div class="wrapper2">
      <div class="flex align-center action " v-for="(groupOpt, index) in groupOpts2" :key="groupOpt"
        @click="setActionByCase(groupOpt.type)">
        <span class="svg" v-icon="icons2[index]"></span>
        <span class="desc flex align-center">{{ groupOpt.desc }}</span>
      </div>
    </div>


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


      groupOpts: [{
        desc: this.group.isCollapse ? 'Expand this group' : 'Collapse this group'
        , type: 'collapse'
      },
      { desc: "Duplicate this group", type: 'duplicate' },
      {
        desc: 'Add group', type: 'add'
      },
      { desc: "Delete", type: 'delete' },],
      // TODO change the add icon
      icons: ['collapse', 'duplicateGrp', 'addGrp', 'deleteGrp'],

      groupOpts2: [
        { desc: 'Rename group', type: 'rename' },
        { desc: 'Change group color', type: 'changeColor' }
      ],
      icons2: ['renameGrp', 'colorGrp']
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
        case 'add':
          eventBus.emit('addGroup')
          break;
        case 'changeColor':
          eventBus.emit('focusTitle')
          break;
      }
    }
  },

}
</script>


