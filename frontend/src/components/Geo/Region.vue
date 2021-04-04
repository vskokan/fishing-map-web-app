<template>
    <div class="regionCard">
        <div class="header">
            <div class="name">
                <i class="fas fa-map-pin"></i>
                {{ region.regionName }}
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
        <div class="locationList" v-if="locations.length > 0"> 
            <Location v-for="location in locations" :key="location.id" v-bind:location="location" />
        </div>
        <div v-else class="empty">Пусто</div>
        <div class="add">
            <i class="fas fa-plus"></i>
            Добавить локацию
        </div>
    </div>
</template>

<script>

import GeoData from '@/services/GeoData.js'
import Location from './Location.vue'

export default {
    props:['region'],
    components: {
        Location,
    },
    data() {
        return {
            locations: [],
            locationsAreLoaded: false,
        }
    },
    methods: {
        
    },
    created() {
        GeoData.fetchLocationsByRegion(this.region.regionId)
        .then((json) => {
            this.locationsAreLoaded = true
            this.locations = json.data
        })
    }
}
</script>

<style scoped>
 .regionCard {
            background-color: rgb(243, 243, 243);
    width: 98%;
    padding: 10px;
    border-radius: 15px;
    /* box-shadow: 0 1px 2px 0 rgba(0,0,0,0.16); */
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

    

        .locationList {
        /* background-color: rgb(235, 235, 235); */
        width: 90%;
    padding: 10px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    }

    .header {
        width: 100%;
        color: #000;
        font-size: 25px;
  font-weight: 600;
  letter-spacing: 2px;
  font-family: "IBM Plex Sans", sans-serif;
  text-transform: uppercase;
  margin: 0px 0px 20px 0px;
    }

     .actions {
        font-size: 20px;
        align-self: center;
       
    }

    .actions .fas {
         margin: 0px 10px;
         color: rgb(133, 133, 133);
    }

    .add {
        width: 100%;
        color: rgb(133, 133, 133);
        font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 20px;
    }

    .empty {
        margin-bottom: 10px;
         color: rgb(133, 133, 133);
        font-size: 15px;
  font-weight: 600;
  /* letter-spacing: 2px; */
  font-family: "IBM Plex Sans", sans-serif;
  text-transform: uppercase;
    }
</style>