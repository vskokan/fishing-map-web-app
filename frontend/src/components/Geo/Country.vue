<template>
    <div class="countryCard">
        <div class="header">
            <div class="name">
                <i class="fas fa-flag"></i>
                {{ country.countryName }}
            </div>
            <div class="actions">
                <div class="edit">
                    <i class="fas fa-pen"></i>
                </div>
                <div class="delete">
                    <i class="fas fa-trash"></i>
                </div>
            </div>
        </div>
            <div class="regionList" v-if="regionsAreLoaded">
        <Region v-for="region in regions" :key="region.regionId" v-bind:region="region"/>
        </div>
        <!-- {{ regionsAreLoaded }}
        <div class="regionsList" v-if="regionsAreLoaded">
            
            {{this.regions}}
            <Region  v-for="region in regions" :key="region.regionId" v-bind:region="region"/>
        </div> -->
        <footer>
            <div class="addRegion">
                <i class="fas fa-plus"></i>
                Добавить регион
            </div>
        </footer>
    </div>
</template>

<script>

//import GeoData from '@/services/GeoData.js'
// import RegionList from './RegionList.vue'
import Region from './Region'
import GeoData from '@/services/GeoData.js'

export default {
    props: {
        country: Object
    },
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
   created() {
       this.fetchRegions(this.country.countryId)
   }
    // mounted() {
    //     //alert(this.country.countryId)
    //     this.id = this.country.countryId
    //     alert(this.id)
    //     GeoData.fetchRegionsByCountry(this.id)
    //     .then((json) => {
    //         alert(json)
    //         this.regions = json.data
    //         this.regionsAreLoaded = true
    //     })
    // }
}
</script>

<style scoped>
    .countryCard {
            background-color: #fff;
    width: 70%;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.16);
    justify-content: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    }

    .header, .actions {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-self: start;
    }

    .header {
        width: 100%;
        color: #000;
        font-size: 35px;
  font-weight: 600;
  letter-spacing: 5px;
  font-family: "IBM Plex Sans", sans-serif;
  text-transform: uppercase;
  margin: 0px 0px 20px 0px;
    }

    .actions {
        font-size: 25px;
        align-self: center;
       
    }

    .actions .fas {
         margin: 0px 10px;
         color: rgb(133, 133, 133);
    }

    .addRegion {
        width: 100%;
        color: rgb(133, 133, 133);
        font-size: 20px;
  font-weight: 600;
  
  text-transform: uppercase;
  margin-top: 20px;
    }
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