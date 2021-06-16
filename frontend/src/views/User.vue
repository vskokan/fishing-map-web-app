<template>
    <div class="container">
        <UserProfile v-bind:login="$route.params.login" />
        <!-- Пользователь {{ $route.params.login }} -->
        <!-- Пользователь {{ this.user}} -->
    </div>
</template>

<script>

import UserProfile from '@/components/Users/UserProfile'
// import { mapActions } from 'vuex'
export default {
    components: {
        UserProfile
    },
    // data() {
    //     return {
    //         user: this.$route.params.login
    //     }
    // },
    // watch: {
    //     user: function (newVal) {
    //  alert('fifkfj')
        
    //     this.getUser(newVal);
    //     this.fetchReviews(`user=${newVal}`)
    //   },
    // },
    // // methods: {
    //     ...mapActions(["getUser", "fetchReviews"]),

    // },
    // mounted() {
    //     this.getUser(this.user)
    //     this.fetchReviews(`user=${this.user}`)
    // }
    // methods: {
    //     watch: {
    //         login: function (newVal) {
    //     // alert(newVal.id)
    //         return newVal
    //         },
    //     },
    // }
}
</script>

<style scoped>
    .container {
        width: 100%;
        min-height: 84vh;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        margin: 20px 0px;
    }
</style>