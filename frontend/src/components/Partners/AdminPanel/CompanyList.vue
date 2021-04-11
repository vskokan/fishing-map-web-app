<template>
    <div class="container">
        <div class="companies" v-if="companiesAreLoaded">
            <Company v-for="company in allCompanies" :key="company.id" v-bind:company="company"  />
        </div>
    </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import Company from './Company'

export default {
    components: {
        Company
    },
    computed: mapGetters(['allCompanies', 'companiesAreLoaded']),
    methods: {
        ...mapActions(['fetchCompanies']),
    },
    created() {
        this.fetchCompanies()
    }
    
}
</script>

<style scoped>
 .companies {
     display: flex;
     flex-direction: column;
     gap: 20px;
 }

 .container {
     width: 100%;
     display: flex;
     flex-direction: column;
     align-items: center;
     

 }
</style>