<template>
  <div id="app">
    <MyLoader class="loader" v-if="isAuthLoading" />
    <Header v-if="!isAuthLoading"></Header>
    <transition name="slide-fade" mode="out-in">
      <router-view v-if="!isAuthLoading"> </router-view>
    </transition>
    <Footer v-if="!isAuthLoading"/>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from '@/components/Footer'
import MyLoader from "@/components/MyLoader";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    Header,
    MyLoader,
    Footer
  },
  methods: {
    ...mapActions(["checkSession"]),
  },
  computed: mapGetters(["isAuthLoading"]),
  created() {
    this.checkSession();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&family=Rubik&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Ubuntu+Condensed&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Marmelad&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Baumans&display=swap");
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Baloo+Chettan+2:wght@500&display=swap");

@font-face {
  font-family: Arkhip; /* Имя шрифта */
  src: url(./assets/fonts/Arkhip_font.ttf); /* Путь к файлу со шрифтом */
}

@font-face {
  font-family: Fishhook; /* Имя шрифта */
  src: url(./assets/fonts/Fishhook_Bold.ttf); /* Путь к файлу со шрифтом */
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* padding-top: 20px; */
  /* background: radial-gradient(circle farthest-corner at 100px 50px, #f9faf9, #e0e0e0); */
  background-image: url("./assets/background3.svg");
  background-image: url("./assets/background3.svg"),
    radial-gradient(circle farthest-corner at 100px 50px, #f9faf9, #e0e0e0);
  min-height: calc(100vh);
  height: auto;
  --color-violet: #7d24d6;
  --color-yellow: rgb(255, 230, 0);
  /* --color-darkgray: rgb(56, 56, 56); */
  --color-darkgray: rgb(133, 133, 133);
  /* --color-lightgray: rgb(194, 194, 194); */
  --color-lightgray: rgb(232, 232, 232);
  --color-darkviolet: #571f85;
  --color-red: rgb(192, 67, 67);
  --color-green: rgb(20, 145, 87);
}

.red {
  color: red;
}

* {
  margin: 0px;
  margin-bottom: 0px;
}

.loader {
  position: absolute;
  top: 50%;
  left: 47%;
}

/* button {
    height: 40px;
    font-size: 22px;
    border: none;
    background-color: #557481;
    color: rgb(255, 255, 255);
    border-radius: 5px;
    margin: 10px 0px 0px 10px;
    font-family: 'Rubik', sans-serif;
}

button:hover {
    background-color:   #7c8e51fd;
    cursor: pointer;
} */

.button-simple {
  height: 40px;
  font-size: 24px;
  border: none;
  padding: 20px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* background-color: transparent; */
  background-color: var(--color-violet);
  color: rgb(255, 255, 255);
  /* border: 3px solid rgb(101, 15, 172); */
  border-radius: 10px;
  /* margin: 10px 0px 0px 10px; */
  margin-left: 5px;
  margin-right: 5px;
  text-transform: uppercase;
  /* font-family: "Rubik", sans-serif; */
  font-family: "Inter", sans-serif;
  /* font-weight: 600; */
  letter-spacing: 1.1px;
  transition: 0.5s;
}

.button-simple:hover {
  /* border-color:transparent; */
  background-color: var(--color-darkviolet);
  color: #fff;
  cursor: pointer;
}

.button-simple-disabled {
  cursor: auto;

  background-color: var(--color-lightgray);
  /* border: 3px solid var(--color-lightgray); */
  color: #fff;
}

.button-simple-disabled:hover {
  cursor: auto;
  background-color: var(--color-lightgray);
  color: #fff;
  /* border: 3px solid var(--color-lightgray); */
  /* color: var(--color-lightgray); */
  /* background-color: transparent; */
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
}

Header {
  z-index: 5;
}

router-view {
  z-index: 3;
}

.button-tableheader {
  height: 40px;
  font-size: 24px;
  border: none;
  /* background-color: transparent; */
  background-color: var(--color-violet);
  color: rgb(252, 252, 252);
  /* border: 3px solid rgb(255, 255, 255); */
  border-radius: 10px;
  /* margin: 10px 0px 0px 10px; */
  margin-left: 5px;
  margin-right: 5px;
  text-transform: uppercase;
  font-family: "Rubik", sans-serif;
  /* font-weight: 700; */
  transition: 0.5s;
  /* box-shadow: 0px 2px rgb(0, 0, 0); */
}

.button-tableheader:hover {
  border-color: transparent;
  background-color: var(--color-darkviolet);
  color: rgb(255, 255, 255);
  cursor: pointer;
}
</style>



