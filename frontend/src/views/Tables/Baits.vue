<template>
    <div class="area">
        <BaitTable/>
    </div>
</template>

<script>

import BaitTable from '@/components/Baits/BaitTable'

export default {
    components: { BaitTable },
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