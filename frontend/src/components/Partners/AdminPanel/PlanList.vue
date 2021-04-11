<template>
    <div class="container" v-if="plansAreLoaded">
        <div class="addPlan" @click="startPlanCreation">Добавить тарифный план</div>
        <NewPlan class="newPlan" v-if="planCreation" @created="create"  />
        <div class="plans">
            <Plan v-for="plan in allPlans" :key="plan.id" :plan="plan" @delete="removePlan" @update="editPlan" />
        </div>
        
    </div>
</template>

<script>

import { mapGetters, mapActions, mapMutations } from 'vuex'
import Plan from './Plan'
import NewPlan from './NewPlan'

export default {
    components: {
        Plan,
        NewPlan
    },
    computed: mapGetters(['allPlans', 'plansAreLoaded', 'planCreation', ]),
    methods: {
        ...mapActions(['fetchPlans', 'createPlan', 'deletePlan', 'updatePlan']),
        ...mapMutations(['startPlanCreation']),
        // initPlanCreation() {
        //     this.startPlanCreation()
        // },
        create(plan) {
            const data = new FormData()
            data.append('name', plan.name)
            data.append('price', plan.price)
            data.append('description', plan.description)
            data.append('discountSupport', plan.discountSupport)

            this.createPlan(data)
        },
        removePlan(plan) {
            this.deletePlan(plan)
        },
        editPlan(data) {
            const plan = new FormData()
            plan.append('name', data.name)
            plan.append('price', data.price)
            plan.append('description', data.description)
            plan.append('discountSupport', plan.discountSupport)

            this.updatePlan({id: data.id, data: plan})
        }
    },
    created() {
        this.fetchPlans()
    }
    
}
</script>

<style scoped>
 .plans {
     display: flex;
     flex-direction: column;
     gap: 20px;
 }

 .addPlan, .newPlan {
     margin-bottom: 20px;
 }
</style>