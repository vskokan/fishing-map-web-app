<template>
    <div class="container" v-if="plansAreLoaded">
        <div class="addPlan" @click="startPlanCreation">Добавить тарифный план</div>
        <NewPlan v-if="planCreation" />
        <Plan v-for="plan in allPlans" :key="plan.id" :plan="plan" />
    </div>
</template>

<script>

import { mapGetters, mapActions, mapMutations } from 'vuex'
import Plan from '../Plan'
import NewPlan from './NewPlan'

export default {
    components: {
        Plan,
        NewPlan
    },
    computed: mapGetters(['allPlans', 'plansAreLoaded', 'planCreation']),
    methods: {
        ...mapActions(['fetchPlans']),
        ...mapMutations(['startPlanCreation']),
        createPlan() {
            this.startPlanCreation()
        }
    },
    created() {
        this.fetchPlans()
    }
    
}
</script>

