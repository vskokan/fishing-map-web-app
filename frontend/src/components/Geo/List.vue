<template>
  <div class="list" v-if="countriesAreLoaded">
    <!-- {{ allCountries }} -->
    <div class="addCountry" @click="openCountryCreation">
      <i class="fas fa-plus" ></i>
      Добавить страну
    </div>
     <transition name="slide-fade" mode="out-in">
    <div class="newCountry" v-if="countryCreationIsActive">
      <div class="header">
        <div class="name">
          <i class="fas fa-flag"></i>
          <input type="text" class="countryName" v-model="newCountry">
        </div>
        <div class="actions">
          <div class="cancel" @click="cancelCountryCreation">
            <i class="fas fa-times"></i>
          </div>
          <div class="add" @click="addCountry">
            <i class="fas fa-plus"></i>
          </div>
        </div>
      </div>
    </div>
     </transition>
    <div class="countriesList">
      <Country
        v-for="country in allCountries"
        :key="country.countryId"
        v-bind:country="country"
        @delete="deleteCountry"
        @update="updateCountry"
      />
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
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

import Country from "./Country.vue";
import GeoData from "@/services/GeoData.js";

export default {
      data() {
      return {
          countryCreationIsActive: false,
          newCountry: ''
      }
  },
  computed: mapGetters(["allCountries", "countriesAreLoaded"]),
  methods: {
    ...mapActions(["fetchCountries"]),
    openCountryCreation() {
        if (!this.countryCreationIsActive) {
            this.countryCreationIsActive = true
        }
    },
    cancelCountryCreation() {
        this.countryCreationIsActive = false
    },
    addCountry() {
        if (this.newCountry.length !== 0) {
            const country = new FormData()
            country.append('name', this.newCountry)
            GeoData.createCountry(country)
            .then(() => {
                this.cancelCountryCreation()
                this.newCountry = ''
                this.fetchCountries()
            })
        }
    },
    deleteCountry(data) {
        GeoData.deleteCountry(data.id)
        .then(() => {
            this.fetchCountries()
        })
    },
    updateCountry(data) {
        const country = new FormData()
        country.append('name', data.name)
        GeoData.updateCountry(data.id, country)
        .then(() => {
            this.fetchCountries()
        })
    }

  },
  components: {
    Country,
  },

  created() {
    this.fetchCountries();
    // this.fetchRegions()
    // this.fetchLocations()
  },
};
</script>

<style scoped>
.list {
  width: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.countriesList {
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.addCountry {
    width: 100%;
  color: rgb(133, 133, 133);
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
}

.add, .cancel {
  width: 100%;
  color: rgb(133, 133, 133);
  font-size: 35px;
  font-weight: 600;
    margin: 0px 10px;
  text-transform: uppercase;
  /* margin-top: 20px; */
}

.newCountry{
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
  margin: 10px 0px 0px 0px;
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

.countryName {
  color: #000;
  font-size: 35px;
  font-weight: 600;
  letter-spacing: 5px;
  font-family: "IBM Plex Sans", sans-serif;
  /* margin: 0px 0px 20px 0px; */
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

</style>
