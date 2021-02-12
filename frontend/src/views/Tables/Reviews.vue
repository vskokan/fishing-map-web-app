<template>
    <div class="area">
        <ReviewTable/>
    </div>
</template>

<script>

import ReviewTable from '@/components/Reviews/AdminPanel/ReviewTable'

export default {
    components: { ReviewTable },
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