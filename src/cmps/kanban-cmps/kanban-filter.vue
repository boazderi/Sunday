<template>

  <section class="kanban-filter flex column ">
    <span class="customize">Customize View </span>

    <div class="sub-header flex align-center space-between">
      <span>Kanban Column</span>
      <span class="svg" v-icon="'information'"></span>
    </div>

    <div class="select-wrapper ">
      <el-select  clearable :placeholder="currFilter" ref="selectEl" @change="onSetFilterBy">
        <el-option v-for="item in options" :key="item.value"
         :label="item.label" :value="item.value" />
      </el-select>
    </div>

    <section class="card-columns-wrapper">
      <div class="sub2-header flex align-center space-between">
        <span>Card Columns</span>
        <span class="svg" v-icon="'information'"></span>
      </div>

      <div class="all-columns flex align-center">
        <input type="checkbox" ref="all" @change="toggleAllCheckbox">
        <span>All-Columns</span>
      </div>

      <div class="flex column ">

        <div class="card-col flex align-center space-between" v-for="col in cardColumns" :key="col">
          <div class="sub2 flex align-center">
            <input type="checkbox" :ref="col" @change="setSelectedColumns(col)">
            <span>{{ col.charAt(0).toUpperCase() +
                col.slice(1)
            }}</span>
          </div>

          <!-- todo render icons by cmp name -->
          <span class="svg" v-icon="col"></span>
        </div>

      </div>

    </section>

  </section>
</template>

<script>
export default {
  name: 'kanban-filter',
  data() {
    return {
      cardColumns: ['members', 'status', 'priority', 'date', 'textNote', 'timeline'],
      selectedColumns: ['members', 'status'],
      options: [{ value: 'status', label: 'Status' },
      { value: 'priority', label: 'Priority' }],
      currFilter:'Status'

    }
  },
  created() {
    this.$emit('setSelectedColumns', this.selectedColumns)

  },
  mounted() {
    this.$refs.members[0].checked = true
    this.$refs.status[0].checked = true
  },

  methods: {
    onSetFilterBy(val) {
      this.$emit('setFilterBy', val)
      this.currFilter=val.charAt(0).toUpperCase()+val.slice(1)
      // console.log(this.$refs.selectEl.placeholder) 
    },
    setSelectedColumns(col) {
      if (this.$refs[col][0].checked) this.selectedColumns.push(col)
      else {
        const idx = this.selectedColumns.findIndex(s => s === col)
        this.selectedColumns.splice(idx, 1)
      }
      this.$emit('setSelectedColumns', this.selectedColumns)
    },
    toggleAllCheckbox() {
      if (this.$refs.all.checked) {

        this.selectedColumns = []
        this.cardColumns.forEach(col => {
          this.$refs[col][0].checked = true
          this.selectedColumns.push(col)
        })
      } else {
        this.selectedColumns = []
        this.cardColumns.forEach(col => {
          this.$refs[col][0].checked = false
        })
      }

      this.$emit('setSelectedColumns', this.selectedColumns)
    }
  }
}
</script>

