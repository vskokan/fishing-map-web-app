<template>
    <div class="area">
        <MethodTable/>
    </div>
</template>

<script>

import MethodTable from '@/components/Methods/MethodTable'

export default {
    components: { MethodTable },
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