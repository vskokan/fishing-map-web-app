<template>
  <div class="locationCard">
    <div class="location" v-if="!editIsActive">
      <div class="name">
        <i class="fas fa-city"></i>
        {{ location.locationName }}
        <div class="departments">
          <i class="fas fa-store-alt"></i>
          {{ +location.departmentsAmount }}
        </div>
      </div>
      <div class="actions">
        <div class="edit" @click="activateEdition">
          <i class="fas fa-pen"></i>
        </div>
        <div class="delete" @click="deleteLocation">
          <i class="fas fa-trash"></i>
        </div>
      </div>
    </div>
    <div class="new" v-if="editIsActive">
      <div class="name">
        <i class="fas fa-city"></i>
        <input type="text" class="input" v-model="newLocation" v-focus />
      </div>
      <div class="location-actions">
        <div class="cancel" @click="cancel">
          <i class="fas fa-times"></i>
        </div>
        <div class="add-location" @click="updateLocation">
          <i
            class="fas fa-plus"
            :class="{ 'fas fa-plus disabled': newLocation.length == 0 }"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GeoData from "@/services/GeoData.js";

export default {
  props: ["location", "region"],
  data() {
    return {
      editIsActive: false,
      newLocation: this.location.locationName
    };
  },
  methods: {
    deleteLocation() {
      if (this.location.departmensAmount != 0) {
        GeoData.deleteLocation(this.location.locationId).then(() => {
          this.$emit("remove", this.location.locationId);
        });
      }
    },
    activateEdition() {
        if (!this.editIsActive) {
            this.editIsActive = true
        }
    },
    cancel() {
        this.newLocation = this.location.locationName
        this.editIsActive = false;
    },
    updateLocation() {
        
        this.$emit("update", {id: this.location.locationId, name: this.newLocation})
        this.editIsActive = false;
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
    
  
};
</script>

<style scoped>
.locationCard {
  background-color: #fff;
  width: 48vw;
  padding: 10px;
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
  display: flex;
  align-items: center;
}
.departments {
  margin-left: 10px;
  width: 3vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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

.name .fas {
  margin-right: 5px;
}

.new {
  background-color: #fff;
  width: 48vw;
  padding: 10px;
  border-radius: 15px;
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
  /* padding: 10px 10px; */
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

.fas .fa-plus .disabled, .fas .fa-plus .disabled:hover {
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
</style>
