<template>
    <div class="list" v-if="countriesAreLoaded">
        <!-- {{ allCountries }} -->
        <div class="add">
            <i class="fas fa-plus"></i>
            Добавить страну
        </div>
        <div class="countriesList">
            <Country v-for="country in allCountries" :key="country.countryId" v-bind:country="country" />
        </div>
        

        
        <!-- <header class="listHeader">
            <button class="button-simple">
                Добавить страну
            </button>
                        <button class="button-simple">
                Добавить регион
            </button>
                        <button class="button-simple">
                Добавить населенный пункт
            </button>
        </header>
        <main>
            <div class="countries" v-for="country in allCountries" :key="country.countryId">
                <div class="countryName">
                    {{ country.countryName }}
                </div>
                <div class="regions" v-for="region in allRegions" :key="region.regionId" v-show="country.countryId == region.countryId">
                    Регион {{region.regionName}}
                    <div class="locations" v-for="location in allLocations" :key="location.locationId" v-show="location.regionId == region.regionId">
                        Нас.пункты {{ location.locationName}}
                    </div>
                </div>
            </div>
        </main> -->
    </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

import Country from './Country.vue'

export default {
    computed: mapGetters(['allCountries', 'countriesAreLoaded']),
    methods: {
        ...mapActions(['fetchCountries'])
    },
    components: {
        Country
    },
    created() {
        this.fetchCountries()
        // this.fetchRegions()
        // this.fetchLocations()
    }
}

</script>

<style scoped>

.list {
    width: 100%;
    padding: 40px;
    display: flex;
    flex-direction: column;
}

.countriesList {
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.add {
    width: 100%;
        color: rgb(133, 133, 133);
        font-size: 20px;
  font-weight: 600;
  
  text-transform: uppercase;
  /* margin-top: 20px; */
}

</style>
