<template>
  <div class="countryCard">
    <div class="header" v-if="!countryEditionIsActive">
      <div class="name">
        <i class="fas fa-flag"></i>
        {{ country.countryName }}
      </div>
      <div class="actions">
        <div class="edit" @click="openCountryEdition">
          <i class="fas fa-pen"></i>
        </div>
        <div class="delete" @click="deleteCountry">
          <i class="fas fa-trash"></i>
        </div>
      </div>
    </div>
    <div class="country-header-new" v-if="countryEditionIsActive">
      <div class="name">
        <i class="fas fa-flag"></i>
        <input type="text" v-focus v-model="editedCountry" />
      </div>
      <div class="country-actions">
        <div class="edit" @click="cancelCountryEdition">
          <i class="fas fa-times"></i>
        </div>
        <div class="delete">
          <i class="fas fa-plus" @click="updateCountry"></i>
        </div>
      </div>
    </div>
    <div class="regionList" v-if="regionsAreLoaded">
      <Region
        v-for="region in regions"
        :key="region.regionId"
        v-bind:region="region"
        @update="updateRegion"
        @delete="deleteRegion"
      />
    </div>
     <transition name="slide-fade" mode="out-in">
    <div class="newRegion" v-if="regionCreationIsActive" >
      <div class="header-new">
        <div class="name">
          <i class="fas fa-map-pin"></i>
          <input type="text" v-focus v-model="newRegion">
        </div>
        <div class="region-actions">
          <div class="edit" @click="cancelRegionCreation">
            <i class="fas fa-times"></i>
          </div>
          <div class="delete">
            <i class="fas fa-plus" @click="createRegion"></i>
          </div>
        </div>
      </div>
    </div>
    </transition>
    <footer>
      <div class="addRegion" @click="openRegionCreation" :class="{'addRegion-disabled' : regionCreationIsActive}">
        <i class="fas fa-plus"></i>
        Добавить регион
      </div>
    </footer>
     
  </div>
</template>

<script>
//import GeoData from '@/services/GeoData.js'
// import RegionList from './RegionList.vue'
import Region from "./Region";
import GeoData from "@/services/GeoData.js";

export default {
  props: {
    country: Object,
  },
  components: {
    Region,
  },
  data() {
    return {
      regions: [],
      regionsAreLoaded: false,
      regionCreationIsActive: false,
      newRegion: '',
      countryEditionIsActive: false,
      editedCountry: this.country.countryName
    };
  },
  methods: {
    fetchRegions(id) {
      GeoData.fetchRegionsByCountry(id).then((json) => {
        this.regionsAreLoaded = true;
        this.regions = json.data;
      });
    },
    openRegionCreation() {
        if (!this.regionCreationIsActive)
            this.regionCreationIsActive = true
    },
    cancelRegionCreation() {
        this.regionCreationIsActive = false
    },
    createRegion() {
        if (this.newRegion !== '') {
            let region = new FormData()
            region.append('name', this.newRegion)
            region.append('country', this.country.countryId)
            GeoData.createRegion(region)
            .then(() => {
                this.regionCreationIsActive = false
                this.newRegion = ''
                this.fetchRegions(this.country.countryId)
            })

        }
        //geodata
    },
    updateRegion(data) {
        const region = new FormData()
        region.append('name', data.name)
        GeoData.updateRegion(data.id, region)
        .then(() => {
            this.fetchRegions(this.country.countryId)
        })
    },
    deleteRegion(data) {
      GeoData.deleteRegion(data.id)
      .then(() => {
        this.fetchRegions(this.country.countryId)        
      })
    },
    deleteCountry() {
      this.$emit('delete', {id: this.country.countryId})
    },
    openCountryEdition() {
      if (!this.countryEditionIsActive)
        this.countryEditionIsActive = true
    },
    cancelCountryEdition() {
      this.countryEditionIsActive = false
    },
    updateCountry() {
      this.cancelCountryEdition()
      this.$emit('update', {id: this.country.countryId, name: this.editedCountry})
    }

  },
    directives: {
    focus: {
      // определение директивы
      inserted: function(el) {
        el.focus();
      },
    },
  },
  created() {
    this.fetchRegions(this.country.countryId);
  },
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
};
</script>

<style scoped>
.countryCard {
  background-color: #fff;
  width: 58vw;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
  justify-content: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.header,
.actions {
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
  /* width: 95%; */
  padding: 20px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: rgba(118, 71, 206, 0.5);
}

.newRegion {
  background-color: rgb(243, 243, 243);
  width: 53vw;
  padding: 10px;
  border-radius: 15px;
  /* box-shadow: 0 1px 2px 0 rgba(0,0,0,0.16); */
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.country-actions {
  font-size: 35px;
  align-self: center;
}

.country-actions .fas {
  margin: 0px 10px;
  color: rgb(133, 133, 133);
}

.country-actions{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: center;
}

.header-new {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: start;
}

.header-new {
  width: 100%;
  color: #000;
  font-size: 25px;
  font-weight: 600;
  letter-spacing: 2px;
  font-family: "IBM Plex Sans", sans-serif;
  text-transform: uppercase;
}

.region-actions {
  font-size: 25px;
  align-self: center;
}

.region-actions .fas {
  margin: 0px 10px;
  color: rgb(133, 133, 133);
}

.region-actions{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: center;
}

.country-header-new {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: start;
}

.country-header-new {
  width: 100%;
  color: #000;
  font-size: 35px;
  font-weight: 600;
  letter-spacing: 2px;
  font-family: "IBM Plex Sans", sans-serif;
  text-transform: uppercase;
}

input {
  color: #000;
  background-color: transparent;
  font-size: 35px;
  font-weight: 600;
  letter-spacing: 2px;
  font-family: "IBM Plex Sans", sans-serif;
  /* text-transform: uppercase; */
  margin-left: 10px;
  border: none;
  border-bottom: 1px solid var(--color-lightgray);
  outline: none;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
}

.addRegion:hover {
    color: var(--color-violet);
    cursor: pointer;
}



.addRegion-disabled, .addRegion-disabled:hover {
      width: 100%;
  color: rgb(133, 133, 133);
  font-size: 20px;
  font-weight: 600;

  text-transform: uppercase;
  margin-top: 20px;
    color: rgb(194, 194, 194);
    cursor: auto;
}
</style>
