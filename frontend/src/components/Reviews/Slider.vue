<template>
  <div class="slider" @click="close">
    <div class="area">
      <div class="navigation">
        <i
          class="fas fa-chevron-left"
          @click="previosPhoto(currentPhoto, photos)"
        >
        </i>
      </div>
      <img
        class="current"
        :src="'http://localhost:3000/' + currentPhoto.src"
        @click="openPhoto(currentPhoto)"
      />
      <div class="navigation">
        <i
          class="fas fa-chevron-right"
          @click="nextPhoto(currentPhoto, photos)"
        >
        </i>
      </div>
    </div>
    <div class="list">
      <img
        :class="{ unactive: !isActive(photo) }"
        v-for="photo in photos"
        :key="photo.id"
        :src="'http://localhost:3000/' + photo.src"
        @click="chooseFromList(photo)"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: ["photos", "active"],
  data() {
    return {
      currentPhoto: {},
    };
  },
  methods: {
    ...mapMutations(["changeSliderView"]),
    close(e) {
      if (e.target.className === "area" || e.target.className === "list")
        this.changeSliderView();
    },
    openPhoto(photo) {
      window.open("http://localhost:3000/" + photo.src, "_blank");
    },
    isActive(photo) {
      if (photo.src == this.currentPhoto.src) return true;

      return false;
    },
    chooseFromList(photo) {
      this.currentPhoto = photo;
    },
    nextPhoto(currentPhoto, photos) {
      let index = 0;
      photos.forEach((photo) => {
        if (currentPhoto.src == photo.src) {
          index = photos.indexOf(photo);
        }
      });
      if (index == this.photos.length - 1) {
        this.currentPhoto = photos[0];
      } else {
        this.currentPhoto = photos[index + 1];
      }
    },
    previosPhoto(currentPhoto, photos) {
      let index = 0;
      photos.forEach((photo) => {
        if (currentPhoto.src == photo.src) {
          index = photos.indexOf(photo);
        }
      });
      if (index == 0) {
        this.currentPhoto = photos[photos.length - 1];
      } else {
        this.currentPhoto = photos[index - 1];
      }
    },
  },
  created() {
    this.currentPhoto = this.active;
  },
};
</script>

<style scoped>
.slider {
  background-color: rgba(0, 0, 0, 0.877);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-around;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;

  z-index: 4;
}
.area {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.close {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 50px;
  bottom: 100px;
  font-size: 40px;
}

.navigation {
  margin: 0px 100px;
  display: flex;
  align-items: center;
  font-size: 40px;
}

.list {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.list img {
  height: 120px;
  width: 120px;
  border: transparent;
  color: #000;
  border-radius: 3px;
  margin-right: 10px;
  object-fit: cover;
}

.fas {
  color: #fff;
}

.fas:hover {
  cursor: pointer;
}

.unactive {
  filter: brightness(40%);
  cursor: pointer;
}

.current {
    height: 75vh;
    margin-bottom: 15px;
}
</style>
