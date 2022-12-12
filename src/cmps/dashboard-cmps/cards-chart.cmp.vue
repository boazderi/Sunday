<template>
  <section
    v-if="isDataSection"
    @click="toggleSections"
    title="Click to switch"
    class="dashboard-stats flip-horizontal-bottom chart-container flex flex-col"
  >
  <h3 class="chart-head"> Stats Summary </h3>
  <div class="flex cards-stats-container">
    <article class="stat flex">
      <h4 class="card-title-item"> Board tasks</h4>
      <div class="dashboard-card-img">
        <img src="https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670834996/c3zdyyijg55lchdizyms.png" alt="">
      </div> 
      <h2>{{ this.data.tasks }}</h2>
    </article>
    <article class="stat flex">
      <h4 class="card-title-item">Board members</h4>
      <div class="dashboard-card-img">
        <img src="https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670836326/vs65au4ziq8doqbfg5nw.png" alt="">
      </div> 
      <h2>{{ this.data.members }}</h2>
    </article>
    <article class="stat flex">
      <h4 class="card-title-item"> Board groups</h4>
      <div class="dashboard-card-img">
        <img src="https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670836288/norwj2agywgcofdljulp.png" alt="">
      </div> 
      <h2>{{ this.data.groups }}</h2>
    </article>
      </div>
  </section>
  <section
    v-else
    @click="toggleSections"
    title="Click to switch"
    class="dashboard-stats flip-horizontal-bottom chart-container flex flex-col"
  >
    <h3 class="chart-head"> Team Members </h3>
  <div class="flex cards-stats-container">
    <article class="stat member-card flex">
      <h4 class="card-title-item">Tal Liber</h4>
      <div><img class="memberDashPic" :src="this.members[0].imgUrl" alt="" /></div>
      <div class="flex icons-container align-items-center">
                <a href="https://www.linkedin.com/in/boaz-deri/" target="_blank">
                    <div class="icon">
                        <img class="linkedin-icon img-icon" src="https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670587995/t8jum7b1nn8emby15kee.png" width="30" height="30" alt="">
                    </div>
                </a>
                <a href="https://www.facebook.com/tal.liber" target="_blank">
                    <div class="icon">
                        <img class="facebook-icon img-icon" src="https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670587995/oq4ndyyjo4je5n1jpil3.png" width="30" height="30" alt="">
                    </div>
                </a>
                <a href="https://www.instagram.com/boazderi/" target="_blank">
                    <div class="icon">
                        <img class="instagram-icon img-icon " src="https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670587995/dwxkrzgbntfrf1z1wggf.png" width="30" height="30" alt="">
                    </div>
                </a>
            </div>
    </article>
    <article class="stat member-card flex">
      <h4 class="card-title-item">Boaz Deri</h4>
        <div><img class="memberDashPic" :src="this.members[2].imgUrl" alt="" /></div>
        <div class="flex icons-container align-items-center">
                <a href="https://www.linkedin.com/in/boaz-deri/" target="_blank">
                    <div class="icon">
                        <img class="linkedin-icon img-icon" src="https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670587995/t8jum7b1nn8emby15kee.png" width="30" height="30" alt="">
                    </div>
                </a>
                <a href="https://www.facebook.com/boazderi/" target="_blank">
                    <div class="icon">
                        <img class="facebook-icon img-icon" src="https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670587995/oq4ndyyjo4je5n1jpil3.png" width="30" height="30" alt="">
                    </div>
                </a>
                <a href="https://www.instagram.com/boazderi/" target="_blank">
                    <div class="icon">
                        <img class="instagram-icon img-icon " src="https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670587995/dwxkrzgbntfrf1z1wggf.png" width="30" height="30" alt="">
                    </div>
                </a>
            </div>
    </article>
    <article class="stat member-card flex">
        <h4 class="card-title-item">Arnon Arditi</h4>
        <div><img class="memberDashPic" :src="this.members[1].imgUrl" alt="" /></div>
        <div class="flex icons-container align-items-center">
                <a href="https://www.linkedin.com/in/boaz-deri/" target="_blank">
                    <div class="icon">
                        <img class="linkedin-icon img-icon" src="https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670587995/t8jum7b1nn8emby15kee.png" width="30" height="30" alt="">
                    </div>
                </a>
                <a href="https://www.facebook.com/arnon.rdt" target="_blank">
                    <div class="icon">
                        <img class="facebook-icon img-icon" src="https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670587995/oq4ndyyjo4je5n1jpil3.png" width="30" height="30" alt="">
                    </div>
                </a>
                <a href="https://www.instagram.com/boazderi/" target="_blank">
                    <div class="icon">
                        <img class="instagram-icon img-icon " src="https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670587995/dwxkrzgbntfrf1z1wggf.png" width="30" height="30" alt="">
                    </div>
                </a>
            </div>
    </article>
          </div>
  </section>
</template>

<script>
export default {
  props: {
    data: Object,
    members: Array,
  },
  data() {
    return {
      isDataSection: true,
    };
  },
  methods: {
    toggleSections() {
      this.isDataSection = !this.isDataSection;
    },
  },
};
</script>
