<template>
    <div class="area">
        <UserList/>
    </div>
</template>

<script>

import UserList from '@/components/Users/UserList'

export default {
    components: { UserList },
}

</script>

<style scoped>
    .area {
        /* min-height: 84vh; */
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding: 20px 0px;
    }
</style>