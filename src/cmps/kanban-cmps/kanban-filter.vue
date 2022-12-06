<template>
  <section class="kanban-filter">
    <h2>kanban-filter</h2>

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

