<template>
    <section class="flex align-center board-top-actions">

        <div class="users-list-old flex column align-center outboard-hover">
            <div class="flex center">
                <span>Last-seen</span>
                <member-preview class="login-img" :member="loggedinUser"></member-preview>
            </div>

            <!-- <section class="users-dropdown-old flex column" v-if="isDropOpen">
                <div @click="setLoggedInUser(user._id)" class="user-item flex align-center" v-for="user in users"
                    :key="user">
                    <member-preview :member="user" class="user-img"></member-preview>
                    <span>{{ user.fullname }}</span>
                </div>
            </section> -->
        </div>

        <div class="users-list flex column align-center" @click="toggleDropDown">

            <div class="invite-btn flex align-center outboard-hover">
                <span class="svg" v-icon="'invite'"></span>
                <button>{{ getCountOfMembers }}</button>
            </div>

            <!-- Dropdown -->
            <div class="users-dropdown flex column " v-if="isDropOpen">
                <span class="drop-title">Add user as board member</span>
                <div @click="onAddMemberToBoard(user)" class="user-item flex align-center " v-for="user in usersToShow"
                    :key="user">
                    <member-preview :member="user" class="user-img"></member-preview>
                    <span>{{ user.fullname }}</span>
                </div>

            </div>



        </div>

    </section>
</template>

<script>
import memberPreview from "./../member-preview.vue";
export default {
    data() {
        return {
            users: null,
            loggedinUser: null,
            currBoard: null,
            isDropOpen: false,
        }
    },
    created() {
        this.users = this.$store.getters.users
        this.loggedinUser = this.$store.getters.loggedinUser
        this.currBoard = this.$store.getters.getCurrBoard
    },
    methods: {
        toggleDropDown() {
            this.isDropOpen = !this.isDropOpen
        },
        async onAddMemberToBoard(userToAdd) {
            var newMembers = JSON.parse(JSON.stringify(this.currBoard.members))
            newMembers.push(userToAdd)
            await this.$store.dispatch({ type: 'updateCurrBoard', prop: 'members', toUpdate: newMembers })
            this.currBoard = this.$store.getters.getCurrBoard
            this.isDropOpen = false
        }
    },
    computed: {
        getCountOfMembers() {
            const length = this.currBoard.members.length
            return `Invite / ${length}`
        },
        usersToShow() {
            var filteredUsers = this.users.filter(user => {
                return !this.currBoard.members.some(m => m.id === user._id)
            })
            filteredUsers = JSON.parse(JSON.stringify(filteredUsers))
            filteredUsers.forEach(user => {
                user.id = user._id
                delete user._id
            })

            return filteredUsers
        }
    },
    components: {
        memberPreview
    }
}
</script>
