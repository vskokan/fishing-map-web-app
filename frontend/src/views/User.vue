<template>
    <div class="container">
        <UserProfile v-bind:login="$route.params.login" />
        <!-- Пользователь {{ $route.params.login }} -->
    </div>
</template>

<script>

import UserProfile from '@/components/Users/UserProfile'

export default {
    components: {
        UserProfile
    }
}
</script>

<style scoped>
    .container {
        width: 100%;
        height: 88vh;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        margin: auto;
    }
</style>