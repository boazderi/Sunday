<template>
  <section class="members-list-container">
    <!-- todo: check if we need cell1 class -->
    <section class="members-list cell1" @click.stop="isListOpen = !isListOpen">
      <div class="plus-icon" v-icon="'plus'"></div>
      <member-preview v-for="(member, idx) in info.members" :key="idx" :member="member" />
      <div class="member-preview" v-if="!info.members.length">
        <img src="https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670197677/tvg88ynh3rjkldkfvvjr.png" />
      </div>
    </section>
    <el-collapse-transition>
      <div class="members-picker" v-click-outside-element="closeMemberPicker" v-if="isListOpen">
        <members-picker :task="info" @update="onChangeGroupMembers"></members-picker>
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
    };
  },
  methods: {
    onChangeGroupMembers({ toUpdate }) {
      this.$emit("update", { prop: "members", toUpdate });
    },
    closeMemberPicker() {
      this.isListOpen = false
    }
  },
  components: {
    memberPreview,
    membersPicker,
  },
};
</script>
  
