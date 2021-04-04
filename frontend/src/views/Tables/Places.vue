<template>
    <div class="area">
        <List />
    </div>
</template>

<script>

import List from '@/components/Geo/List'

export default {
    components: { List },
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