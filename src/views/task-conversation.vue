<template>

  <section v-if="task" class="task-conversation flex column">
    <header class="conversation-header flex column">

      <button class="flex" @click="goBackToMainTable">
        <span class="svg" v-icon="'closeSmall'"></span>
      </button>

      <section class="task-preview flex align-center space-between">
        <h3>{{task.taskTitle}}</h3>

        <div class="add-member flex align-center">
          <!-- todo render the byMember pic -->
          <div class="member-pic">Mpic</div>
          <button>
            <span class="svg" v-icon="'moreMed'"></span>
          </button>
        </div>
      </section>

      <section class="conversation-nav flex align-center space-between">
        <div class="sub-nav flex align-center">
          <!-- todo-render the sum of updates -->
          <div><span>Updates</span></div>
          <div><span>Files</span></div>
          <div><span>Activity Log</span></div>
        </div>

        <div>
          <span class="svg" v-icon="'addSmall'"></span>
        </div>
      </section>
    </header>

    <!-- Main-content -->
    <section class="conversation-content grow flex column">
      <!-- header -->
      <header class="content-header flex column">
        <!-- todo-change it afterward to button el that open quill -->
        <input type="text" placeholder="Write an update...">

        <!-- todo open the actions bar only after input is focused -->
        <div class="content-actions flex align-items space-between">
          <!-- todo improve that section design -->
          <div class="content-features flex align-center">
            Add files
          </div>

          <button class="update">Update</button>
        </div>
      </header>

      <!-- conversation views -->
      <section class="conversation-views grow">
        <!-- Empty conversation -->
        <div v-if="!task.comments.length" class="empty-conversation flex column align-center">
          <img src="https://cdn.monday.com/images/pulse-page-empty-state.svg">
          <div class="unread-message flex column align-center">
            <h2>No updates yet for this item</h2>
            <p>Be the first one to update about progress, mention someone
              or upload files to share with your team members</p>
          </div>
        </div>

        <section class="comment-preview" v-for="comment in task.comments" :key="comment.id">
          <pre>{{comment}}</pre>
        </section>
      </section>

    </section>

  </section>
</template>

<script>


export default {

  data() {
    return {
      //TODO?- maybe need to do deep copy
      task: null,
      groupId: null
    }
  },
  created() {
    const taskId = this.$route.params.taskId
    const currBoard = this.$store.getters.getCurrBoard
    this.setConversationData(currBoard, taskId)

  },
  methods: {
    goBackToMainTable() {
      const boardId = this.$route.params.id
      this.$router.push(`/board/${boardId}/main-table`)
    },
    setConversationData(currBoard, taskId) {

      currBoard.groups.forEach(group => {
        group.tasks.forEach(task => {
          if (task.id === taskId) {
            this.task = JSON.parse(JSON.stringify(task))
            this.groupId = group.id
          }

        })
      })
    }
  },
//   components:{
// 
//   }
}

</script>

