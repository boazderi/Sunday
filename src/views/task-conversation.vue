<template>
  <section v-if="task" class="task-conversation flex column">
    <header class="conversation-header flex column">

      <button class="flex" @click="goBackToMainTable">
        <span class="svg" v-icon="'closeSmall'"></span>
      </button>

      <section class="task-preview flex align-center space-between">
        <h3>{{ task.taskTitle }}</h3>

        <div class="user-more-sec flex align-center">
          <div class="pic-wrapper flex align-center center">
            <member-preview class="" :member="user"></member-preview>
          </div>

          <button>
            <span class="svg" v-icon="'moreMed'"></span>
          </button>
        </div>
      </section>

      <section class="conversation-nav flex align-center space-between">
        <div class="sub-nav flex align-center">
          <div class="border1"></div>
          <!-- todo-render the sum of comments in title attribute when hover -->
          <div><span>Updates</span></div>
          <div><span class="files-btn">Files</span></div>
          <div><span class="activity-btn">Activity Log</span></div>
        </div>

        <div>
          <span class="svg" v-icon="'addSmall'"></span>
        </div>
      </section>
    </header>

    <div class="main-border"></div>

    <!-- Main-content -->
    <section class="conversation-content grow flex column">

      <!-- header -->
      <header class="content-header flex column">
        <div v-if="!isFormFocus" @click="onOpenForm" contenteditable class="open-update-form flex align-center">
          Write an update...
        </div>

        <div v-else>
          <!-- todo---Quill -->
          <form class="update-form flex align-center column" @submit="onAddComment">
            <input class="grow" ref="commentInput" type="text" v-model="commentTxt" placeholder="" />
            <button class="update flex align-center">Update</button>
          </form>
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

        <section class="comment-preview flex column" v-for="comment in task.comments" :key="comment.id">

          <header class="comment-header flex align-center space-between">
            <div class="wrapper1 flex align-center">
              <member-preview class="member-img" :member="comment.byMember"></member-preview>

              <span>{{ comment.byMember.fullname }} </span>
              <div class="dot"></div>
            </div>

            <div class="wrapper2 flex align-center">
              <div class="post-time">
                <span class="svg" v-icon="'timer'"></span>
                <!-- todo render post time by computed-->
              </div>

              <span class="svg" v-icon="'notificationMember'"></span>
              <span class="svg" v-icon="'moreMember'"></span>
            </div>
          </header>
          <!-- commantTxt -->
          <p class="comment-txt"> {{ comment.txt }} </p>
          <!-- todo add how many see that conversation- in socket phase -->
          <!--bottom btns  -->
          <div class="like-replay flex align-center">
            <button class="like flex align-center center">
              <span class="svg" v-icon="'like'"></span>
              Like</button>
            <button class=" flex align-center center">
              <span class="svg" v-icon="'reply'"></span>
              Reply</button>
          </div>

        </section>
      </section>
    </section>

  </section>
</template>

<script>
import memberPreview from '../cmps/member-preview.vue'
import { utilService } from '../services/util.service.js'
import { socketService, SOCKET_EMIT_SEND_COMMENTS, SOCKET_EVENT_ADD_COMMENTS, SOCKET_EMIT_SET_TOPIC } from '../services/socket.service.js'

export default {
  data() {
    return {
      task: null,
      groupId: null,
      user: null,
      commentTxt: '',
      isFormFocus: false
    }
  },
  created() {
    const taskId = this.$route.params.taskId
    const currBoard = this.$store.getters.getCurrBoard
    this.setConversationData(currBoard, taskId)
    this.user = this.$store.getters.loggedinUser

    socketService.emit(SOCKET_EMIT_SET_TOPIC, taskId)
    socketService.on(SOCKET_EVENT_ADD_COMMENTS, this.addCommentsBySocket)
  },
  unmounted() {
    // update the state after all the comments-socket is finished and user is out
    var toUpdate = this.task.comments
    this.$store.dispatch({
      type: "updateCurrBoard",
      groupId: this.groupId,
      taskId: this.task.id,
      prop: 'comments',
      toUpdate,
    });
    this.isFormFocus = false
  },
  methods: {
    async onAddComment() {
      const { _id, fullname, imgUrl, color } = this.user
      const newComment = {
        id: utilService.makeId(),
        txt: this.commentTxt,
        createdAt: Date.now(),
        byMember: {
          _id,
          fullname,
          imgUrl,
          color
        }
      }

      const updatedComments = [...this.task.comments, newComment]
      this.task.comments = updatedComments
      socketService.emit(SOCKET_EMIT_SEND_COMMENTS, updatedComments)
      this.$refs.commentInput.value = ''
      this.isFormFocus = false
    },
    addCommentsBySocket(comments) {
      this.task.comments = comments
    },
    goBackToMainTable() {
      const boardId = this.$route.params.id
      this.$router.push(`/board/${boardId}/main-table`)
    },
    onOpenForm() {
      this.isFormFocus = true
    },
    onCloseForm() {
      this.isFormFocus = false
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
  components: {
    memberPreview
  }
}

</script>

