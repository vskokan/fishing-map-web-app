<template>
    <div class="area">
        <!-- <AddFish></AddFish> -->
        <FishTable2></FishTable2>
    </div>
</template>

<script>

import FishTable2 from '@/components/Fish/FishTable2'

export default {
    components: { FishTable2 }
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