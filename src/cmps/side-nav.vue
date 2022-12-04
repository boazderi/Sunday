<template>
  <section class="side-nav flex column align-center">

    <div class="monday-icon flex center ">
      <img class="flex center" src="../../src/assets/img/monday_logo_icon.png" width="30" height="30" alt="">
    </div>

    <el-tooltip content="Work management">
      <div class="work-management">
        <span v-icon="'workManagement'"></span>
    </div>
      </el-tooltip>

    <section class="icons-pattern1 flex column align-center">
      <div class="icon-wrapper" v-for="icon in pattern1Icons" :key="icon">
        <span class="svg" 
         v-icon="icon" ></span>
      </div>
    </section>

    <section class="see-plans">
      <div class="text-wrapper flex column">
        <div class="rot">plans</div> 
        <div class="rot">See </div> 
      </div>
    </section>

    <section class="icons-pattern2 flex column align-center">
      <div class="icon-wrapper" v-for="icon in pattern2Icons" :key="icon">
        <span class="svg" 
         v-icon="icon" ></span>
      </div>
    </section>

    <section class="bottom-icons">
      <div class="bottom-icon-wrapper">
        <span class="svg" v-icon="'ninePoints'"></span>
      </div>
    </section>

    <!-- todo add user preview with img -->

  </section>
</template>

<script>
export default {
  data(){
    return{
      pattern1Icons:['notifications','inbox','myWork','sideStar'],
      pattern2Icons:['apps','sideInvite','sideSearch','help']
    }
  }
}
</script>

<style>

</style>