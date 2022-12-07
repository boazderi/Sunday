<template>
    <section class="flex align-center board-top-actions">

        <div class="users-list flex column align-center outboard-hover">
            <div class="flex center " @click="toggleDropDown">
                <span>Last-seen</span>

                <member-preview class="login-img" :member="loggedinUser"></member-preview>
            </div>

        <section class="users-dropdown flex column " v-if="isDropOpen">
            <div class="user-item flex align-center" v-for="user in users" :key="user">
                <member-preview :member="user" class="user-img"></member-preview>
                <span>{{user.fullname}}</span>
            </div>
        </section>
        </div>

    
        <div class="invite-btn flex align-center outboard-hover">
            <span v-icon="'invite'"></span>
            <button>Invite / 1</button>
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
            isDropOpen:false
        }
    },
    created() {
        this.users = this.$store.getters.users
        this.loggedinUser = this.$store.getters.loggedinUser
    },
    methods: {
        toggleDropDown(){
            this.isDropOpen=! this.isDropOpen
        }
    },
    components: {
        memberPreview
    }
}
</script>
