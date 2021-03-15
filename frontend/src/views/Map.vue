<template>
    <div class="mapContainer">
        <!-- <MapFilters /> -->
       <Map></Map>
    </div>
</template>

<script>

import Map from '@/components/Map'


export default {

    components: {
        Map,
        //MapFilters
    },
}

</script>

<style scoped>



  /* div {
      min-height: calc(100vh - 180px)
  } */


     p  {
        margin-top: 5px;
        margin-bottom: 5px;
        /* width: 80%; */
    }

    MapFilters {
        width: 100%;
        position: relative;
        /* top: 1px; */
        z-index: 2;
    }

    .heading {
        font-size: 48px;
        color: rgb(101, 15, 172);
        font-weight: bold;
        font-family: 'Rubik', sans-serif;
    }

    i {
        font-size: 50px;
        margin-left: 30px;
        margin-right: 30px;
    }

    /* .mapContainer {
        height: 600px
    } */
</style>