<template>
  <section>
    <el-card class="person-filter-modal">
      <div class="card-content flex flex-col justify-between">
        <div>
          <div class="filter-person-title">Quick person filter</div>
          <div>Filter items and subitems by person</div>
        </div>
        <div class="flex">
          <div v-for="(member, idx) in board.members"
            :key="idx">
            <member-preview
              class="person-member-btn"
              @click="setFilterBy(member.id)"
              :class="{ 'active-member': isActive === member.id }"
              :member="member"
            />
          </div>
        </div>
      </div>
    </el-card>
  </section>
</template>

<script>
import memberPreview from "./../member-preview.vue";

export default {
  props: {
    board: Object,
  },
  data() {
    return {
      isActive: "",
      filterBy: {
          memberId: null
      },
    };
  },
  created() {
  },
  methods: {
      setFilterBy(memberId){
          this.isActive = memberId
          this.filterBy.memberId = memberId
          this.$emit('setFilterBy', filterBy)
      }
  },
  components: {
    memberPreview,
  },
};
</script>
