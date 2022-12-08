<template>
  <section class="">
    <article class="main-filter-card flex flex-col">
      <h4 class="card-title-item"> {{title}} </h4>
      <div>
          card content
      </div>
    </article>
  </section>
</template>

<script>
import memberPreview from "./../member-preview.vue";

export default {
    props:{
        title: String,
        items: Array
    },
    components:{
        memberPreview
    }
};
</script>
