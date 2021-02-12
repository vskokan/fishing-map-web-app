<template>
    <div class="area">
        <DistrictTable/>
    </div>
</template>

<script>

import DistrictTable from '@/components/Regions/DistrictTable'

export default {
    components: { DistrictTable },
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