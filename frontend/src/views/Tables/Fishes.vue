<template>
    <div class="area">
        <FishList />
    </div>
</template>

<script>

import FishList from '@/components/Fish/FishList'

export default {
    components: { FishList}
}
</script>

<style scoped>
    .area {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
</style>