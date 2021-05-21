<template>
  <div class="mainSettings">
    <div class="area">
      <div class="textFields">
        <div class="inputContainer">
          <label for="name">Имя</label>
          <input type="text" v-model="newUserData.name" />
        </div>
        <div class="inputContainer">
          <label for="name">Адрес электронной почты</label>
          <input type="text" v-model="newUserData.email" />
        </div>
        <div class="inputContainer">
          <label for="name">Место получения скидок</label>
          <!-- <input type="text" v-model="newUserData.location"> -->
          <!-- {{newUserData.location}} -->
          <Multiselect
            v-if="locationsAreLoaded"
            class="multiselect location"
            v-model="newUserData.location"
            :hide-selected="true"
            :options="locations"
            label="locationName"
            track-by="locationId"
            placeholder="Выберите город"
            :multiple="false"
            :close-on-select="true"
            :clear-on-select="false"
            :preserve-search="true"
            :preselect-first="false"
          />
        </div>
      </div>
      <div class="avatarSettings">
        <div class="inputContainer">
          <img class="avatar" :src="'http://localhost:3000/' + user.avatar" />
        </div>
        <div class="inputContainerFile">
          <label for="photo" class="custom-file-upload"
            >Выбрать фото <i class="fas fa-image"></i></label>
          <input
            type="file"
            name="photo"
            id="photo"
            accept=".jpg, .jpeg, .png"
            ref="file"
            v-on:change="uploadImage()"
            required
          />
          <p class="filename">
            {{
              fileIsChosen
                ? this.newUserData.avatar.name
                : "Новый файл не выбран"
            }}
          </p>
        </div>
      </div>
    </div>
    <button class="button-simple" @click="send">Применить</button>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import Multiselect from "vue-multiselect";
import GeoData from "../../services/GeoData";

export default {
  props: ["user"],
  components: {
    Multiselect,
  },
  data() {
    return {
      newUserData: {
        name: this.user.name,
        email: this.user.email,
        location: {},
        avatar: "",
      },
      locationsAreLoaded: false,
      locations: [],
      fileIsChosen: false,
    };
  },
  methods: {
    ...mapActions(['updateCurrentUserSettings']),
    findUserLocation() {
      this.locations.forEach((location) => {
        // console.log(location)
        if (location.locationId == this.user.location) {
          // alert(location.locationId)
          console.log(location);
          this.newUserData.location = location;
        }
      });
    },
    uploadImage() {
        this.fileIsChosen = true
            this.newUserData.avatar = this.$refs.file.files[0];
    },
    send() {
        const userToUpdate = new FormData()
        userToUpdate.append('name', this.newUserData.name)
        userToUpdate.append('email', this.newUserData.email)
        userToUpdate.append('location', this.newUserData.location.locationId)
        userToUpdate.append('avatar', this.newUserData.avatar)
        userToUpdate.append('admin', this.user.admin)

        this.updateCurrentUserSettings({login: this.user.login, formData: userToUpdate})
        this.fileIsChosen = false
    }
  },

  created() {
    GeoData.readAllLocations().then((json) => {
      this.locations = json.data;

      this.findUserLocation();

      this.locationsAreLoaded = true;
    });
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>

.mainSettings {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 65vw;
   padding: 20px;
  height: 100%;
  color: #000;
}

.area {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 40px;
  width: 100%;
}

input {
  margin-top: 5px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid var(--color-lightgray);
  color: #000;
  font-family: "Inter", sans-serif;
  font-size: 16px;
}

input:focus {
  outline: none;
  border: 1px solid var(--color-violet);
}

.location {
    width: 15vw;
    color: #000;
}

input {
    width: 14vw;
}

.textFields {
    width: 40vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    color: #000;
    font-family: "Inter", sans-serif;
  font-size: 18px;
}

.inputContainer {
    width: 30vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0px;
}




.avatarSettings {
 width: 20vw;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
}

.avatarSettings .inputContainer {
    justify-content: center;
}

.avatar {
        width: 200px;
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
    }

    img {
        width: 100%;
    }

    input[type="file"] {
        display: none;
    }

    .custom-file-upload {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 10vw;
        cursor: pointer;
        height: 40px;
        font-size: 20px;
        border: none;
        background-color:  var(--color-violet);
        border-radius: 10px;
        color: rgb(255, 255, 255);
        margin: 10px 0px 0px 10px;
        margin: auto;
    }
    .inputContainerFile {
        margin-bottom: 20px;
        justify-self: center;
    }

    .fa-image {
        margin-left: 10px;
    }

    .custom-file-upload:hover {
        cursor: pointer;
    }

    .filename {
        margin: 10px 0px;
        color: #000;
    font-family: "Inter", sans-serif;
  font-size: 18px;
    }
</style>

<style>


.multiselect__option--highlight:after {
  content: attr(data-select);
  background: var(--color-violet);
  color: rgb(150, 0, 0);
  display: none;
}

.multiselect__option--selected:after {
  content: attr(data-selected);
  color: var(--color-yellow);
  display: none;
}


.multiselect__placeholder {
  color: var(--color-darkgray);
  font-family: "Inter", sans-serif;
  display: inline-block;
  margin-bottom: 10px;
  padding-top: 2px;
  color: #000;
}

.multiselect--active .multiselect__placeholder {
  display: none;
}

.multiselect__option {
  display: block;
  padding: 12px;
  /* color: var(--color-darkgray); */
  font-family: "Inter", sans-serif;
  color: #000;
  /* font-weight: 700; */
  min-height: 40px;
  line-height: 16px;
  text-decoration: none;
  text-transform: none;
  vertical-align: middle;
  position: relative;
  cursor: pointer;
  white-space: nowrap;
}

.multiselect__option--selected {
  background: var(--color-violet);
  color: var(--color-yellow);
  /* font-weight: 700; */
}

.multiselect__single {
  font-family: "Inter", sans-serif;
  /* font-weight: 700; */
  color: #000;
}

.multiselect__option--highlight {
  background: var(--color-violet);
  outline: none;
  color: #fff;
}





</style>