<template>
    <div class="area">
        <UserTable/>
    </div>
</template>

<script>

import UserTable from '@/components/Users/UserTable'

export default {
    components: { UserTable },
}

</script>

<style scoped>
    .area {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>