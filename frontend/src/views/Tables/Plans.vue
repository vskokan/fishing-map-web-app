<template>
    <div class="plans">
        <PlanList />
    </div>
</template>

<script>

import PlanList from '@/components/Partners/AdminPanel/PlanList'

export default {
    components: { PlanList },
}

</script>

<style scoped>
    .plans {
        padding: 40px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
    }
</style>