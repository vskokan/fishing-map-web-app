<template>
    <div class="area">
        <PlaceTable/>
    </div>
</template>

<script>

import PlaceTable from '@/components/Places/PlaceTable'

export default {
    components: { PlaceTable },
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