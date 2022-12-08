<template>

  <section class="kanban-filter flex column ">
    <span class="customize" >Customize View </span>

    <div class="sub-header flex align-center space-between">
      <span>Kanban Column</span>
      
    </div>
    

  </section>
</template>

<script>
export default {
  name: 'kanban-filter',
  data() {
    return {
      columnOpt: [
        {
          value: 'status',
          label: 'Status',
        },
        {
          value: 'priority',
          label: 'Priority',
        }
      ]
    }
  }
}
</script>

