<template>
  <section
    class="members-list-container"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
  >
    <!-- todo: check if we need cell1 class -->
    <section class="members-list cell1" @click="isListOpen = !isListOpen">
      <div v-if="isHover" class="plusIcon" v-icon="'plus'"></div>
      <member-preview
        v-for="(member, idx) in info.members"
        :key="idx"
        :member="member"
      />
      <div class="img-container" v-if="!info.members.length">
        <img
          src="https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670197677/tvg88ynh3rjkldkfvvjr.png"
          width="28"
          height="28"
          alt=""
        />
      </div>
    </section>
    <el-collapse-transition>
      <div class="members-picker" v-if="isListOpen">
        <members-picker
          :task="info"
          @update="onChangeGroupMembers"
        ></members-picker>
      </div>
    </el-collapse-transition>
  </section>
</template>
  
<script>
import memberPreview from "./../member-preview.vue";
import membersPicker from "../boardCmp/members-picker.vue";
export default {
  name: "members",
  emits: ["update"],
  props: {
    info: Object,
  },
  data() {
    return {
      isListOpen: false,
      isHover: false,
    };
  },
  methods: {
    onChangeGroupMembers({ toUpdate }) {
      this.$emit("update", { prop: "members", toUpdate });
    },
  },
  components: {
    memberPreview,
    membersPicker,
  },
};
</script>
  
