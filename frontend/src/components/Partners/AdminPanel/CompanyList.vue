<template>
    <div class="container">
            <div class="addCompany">
      <i class="fas fa-plus" ></i>
      Добавить компанию
    </div>
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

 .addCompany{
    width: 100%;
  color: rgb(133, 133, 133);
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 20px;
}
</style>