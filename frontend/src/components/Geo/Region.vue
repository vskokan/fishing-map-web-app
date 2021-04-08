<template>
  <div class="regionCard">
    <div class="header" v-if="!regionEditionIsActive">
      <div class="name">
        <i class="fas fa-map-pin"></i>
        {{ region.regionName }}
      </div>
      <div class="actions">
        <div class="edit" @click="openRegionEdition">
          <i class="fas fa-pen"></i>
        </div>
        <div class="delete">
          <i class="fas fa-trash" @click="deleteRegion"></i>
        </div>
      </div>
    </div>
    <div class="header-new" v-if="regionEditionIsActive">
      <div class="name">
        <i class="fas fa-map-pin"></i>
        <input type="text" v-focus v-model="editedRegion" />
      </div>
      <div class="region-actions">
        <div class="edit" @click="cancelRegionEdition">
          <i class="fas fa-times"></i>
        </div>
        <div class="delete">
          <i class="fas fa-plus" @click="updateRegion"></i>
        </div>
      </div>
    </div>
    <div class="locationList" v-if="locations.length > 0">
      <Location
        v-for="location in locations"
        :key="location.id"
        v-bind:location="location"
        @remove="updateList"
        @update="updateLocation"
      />
    </div>

    <div v-else class="empty">Пусто</div>
    <transition name="slide-fade" mode="out-in">
      <div class="new" v-if="inputIsOpened">
        <div class="name">
          <i class="fas fa-city"></i>
          <input type="text" class="input" v-model="newLocation" v-focus />
        </div>
        <div class="location-actions">
          <div class="cancel" @click="cancel">
            <i class="fas fa-times"></i>
          </div>
          <div class="add-location" @click="addLocation">
            <i
              class="fas fa-plus"
              :class="{ 'fas fa-plus disabled': newLocation.length == 0 }"
            ></i>
          </div>
        </div>
      </div>
    </transition>
    
    <div class="add" @click="openInput">
      <i class="fas fa-plus"></i>
      Добавить локацию
    </div>
  </div>
</template>

<script>
import GeoData from "@/services/GeoData.js";
import Location from "./Location.vue";
import { mapActions } from "vuex";

export default {
  props: ["region"],
  components: {
    Location,
  },
  data() {
    return {
      locations: [],
      locationsAreLoaded: false,
      newLocation: "",
      inputIsOpened: false,
      regionEditionIsActive: false,
      editedRegion: this.region.regionName
    };
  },
  methods: {
    ...mapActions(["createLocation"]),
    openInput() {
      if (!this.inputIsOpened) this.inputIsOpened = true;
    },
    addLocation() {
      if (this.newLocation.length > 0) {
        const data = new FormData();
        data.append("name", this.newLocation);
        data.append("region", this.region.regionId);
        // console.log(locationName)
        console.log(data);

        GeoData.createLocation(data).then(() => {
          this.newLocation = "";
          this.inputIsOpened = false;
          GeoData.fetchLocationsByRegion(this.region.regionId).then((json) => {
            this.locations = json.data;
          });
        });
      }
    },
    cancel() {
      this.inputIsOpened = false;
      this.newLocation = "";
    },
    updateList() {
      GeoData.fetchLocationsByRegion(this.region.regionId).then((json) => {
        this.locationsAreLoaded = true;
        this.locations = json.data;
      });
    },
    updateLocation(data) {
      console.log(data);
      let location = new FormData();
      location.append("name", data.name);
      GeoData.updateLocation(data.id, location).then(() => {
        this.locationsAreLoaded = false;
        this.updateList();
      });
    },
    openRegionEdition() {
        if (!this.regionEditionIsActive)
        this.regionEditionIsActive = true
    },
    cancelRegionEdition() {
        this.regionEditionIsActive = false
    },
    updateRegion() {
        this.$emit('update', {id: this.region.regionId, name:this.editedRegion})
        this.regionEditionIsActive = false
        this.editedRegion = this.region.regionName
    },
    deleteRegion() {
      if (this.region.locations !== 0)
        this.$emit('delete', {id: this.region.regionId})
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
    GeoData.fetchLocationsByRegion(this.region.regionId).then((json) => {
      this.locationsAreLoaded = true;
      this.locations = json.data;
    });
  },
};
</script>

<style scoped>
.regionCard {
  background-color: rgb(243, 243, 243);
  width: 53vw;
  padding: 10px;
  border-radius: 15px;
  /* box-shadow: 0 1px 2px 0 rgba(0,0,0,0.16); */
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
  height: 4vh;
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

.add:hover {
  cursor: pointer;
  color: var(--color-violet);
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

.new {
  background-color: #fff;
  width: 48vw;
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
  justify-content: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.location-actions {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-self: start;
}

.new .name {
  color: #000;
  font-size: 20px;
}

.new {
  padding: 15px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

input {
  color: #000;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 2px;
  font-family: "IBM Plex Sans", sans-serif;
  /* text-transform: uppercase; */
  margin-left: 10px;
  border: none;
  border-bottom: 1px solid var(--color-lightgray);
  outline: none;
}

.location-actions {
  font-size: 20px;
  align-self: center;
}

.location-actions .fas {
  margin: 0px 10px;
  color: rgb(133, 133, 133);
}

.location-actions .fas:hover {
  cursor: pointer;
  color: var(--color-violet);
}

.disabled {
  color: rgb(192, 192, 192);
  cursor: auto;
}

.fas .fa-plus .disabled,
.fas .fa-plus .disabled:hover {
  color: rgb(192, 192, 192);
  cursor: auto;
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

.header-new {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: start;
}

.header-new {
  width: 100%;
  height: 4vh;
  color: #000;
  font-size: 25px;
  font-weight: 600;
  letter-spacing: 2px;
  font-family: "IBM Plex Sans", sans-serif;
  text-transform: uppercase;
  margin: 0px 0px 20px 0px;
}

input {
  color: #000;
  background-color: transparent;
  font-size: 25px;
  font-weight: 600;
  letter-spacing: 2px;
  font-family: "IBM Plex Sans", sans-serif;
  /* text-transform: uppercase; */
  margin-left: 10px;
  border: none;
  border-bottom: 1px solid var(--color-lightgray);
  outline: none;
}
</style>
