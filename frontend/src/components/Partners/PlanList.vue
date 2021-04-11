<template>
    <div class="container" v-if="plansAreLoaded">
        <Plan v-for="plan in allPlans" :key="plan.id" :plan="plan" />
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import Plan from './Plan'

export default {
    components: {
        Plan
    },
    computed: mapGetters(['allPlans', 'plansAreLoaded']),
    methods: {
        ...mapActions(['fetchPlans']),
    },
    created() {
        this.fetchPlans()
    }
    
}
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 20px;
    }
</style>