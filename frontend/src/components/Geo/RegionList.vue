<template>

</template>

<script>

import Region from './Region'
import GeoData from '@/services/GeoData.js'

export default {
   props:['country'],
   components: {
       Region
   },
   data() {
       return {
           regions: [],
           regionsAreLoaded: false
       }
   },
   methods: {
       fetchRegions(id) {
           GeoData.fetchRegionsByCountry(id)
           .then((json) => {
               this.regionsAreLoaded = true
               this.regions = json.data
           })
       }
   },
   methods: {
       fetchRegions(id) {
           GeoData.fetchRegionsByCountry(id)
           .then((json) => {
               this.regionsAreLoaded = true
               this.regions = json.data
           })
       }
   },
}
</script>

<style scoped>
    .regionList {
        /* background-color: rgb(235, 235, 235); */
        width: 95%;
    padding: 10px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    }
</style>