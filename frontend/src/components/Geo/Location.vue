<template>
    <div class="locationCard">
        <div class="location">
            <div class="name">
                <i class="fas fa-city"></i>
                {{ location.locationName }}
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

    </div>
</template>

<script>

// import GeoData from '@/services/GeoData.js'


export default {
    props:['location'],
    methods: {
        
    },
}
</script>

<style scoped>
.locationCard {
            background-color: #fff;
    width: 98%;
    padding: 10px;
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
        justify-content: flex-start;
        align-self: start;
    }

    .header {
        width: 60%;
    }

    .location {
        width: 100%;
        padding: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .name {
       
        color: #000;
        font-size: 20px;
  font-weight: 600;
  letter-spacing: 2px;
  font-family: "IBM Plex Sans", sans-serif;
  text-transform: uppercase;
 
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
</style>