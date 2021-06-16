<template>
  <div class="menu">
    <ul class="nav">
      <li class="menuitem">
        <router-link to="/map"
          ><i class="fas fa-map-marker-alt"></i>Карта</router-link
        >
      </li>
      <li class="menuitem">
        <router-link to="/fish"><i class="fas fa-fish"></i>Рыба</router-link>
      </li>
      <li class="menuitem">
        <router-link to="/partners"
          ><i class="fas fa-handshake"></i>Партнеры</router-link
        >
      </li>
      <li class="menuitem">
        <router-link to="/about"
          ><i class="fas fa-info-circle"></i>О нас</router-link
        >
      </li>
    </ul>
    <div class="nav-buttons">
      <userPanel v-if="isAuth" />
      <router-link to="/login" v-if="!isAuth"
        ><button class="button-simple">Вход</button></router-link
      >
      <router-link to="/reg" v-if="!isAuth"
        ><button class="button-simple">Регистрация</button></router-link
      >
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import userPanel from "./UserPanel";

export default {
  computed: mapGetters(["isAdmin", "isAuth", "currentUser"]),
  methods: {
    ...mapActions(["logout"]),
    exit() {
      this.logout();
    },
  },
  components: {
    userPanel,
  },
};
</script>

<style scoped>
.router-link-active {
  color: var(--color-violet);
}

.menu {
  background-color: #fff;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-left: 20px;
  align-items: center;
  justify-content: space-between;
}

.nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  margin: 0;
  padding-left: 0;
  height: 100%;
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 500;
  letter-spacing: 1.5px;
  background-color: #fff;
}

.nav-buttons {
  height: 100%;
  display: flex;
  flex-direction: row;
  padding-right: 20px;
  align-items: center;
  justify-content: space-between;
}

.nav-buttons a {
  display: flex;
  align-items: center;
}

button .nav-buttons {
  margin-left: 5px;
}

.menuitem {
  position: relative;
  margin: 0 12px 0px 12px;
  font-size: 28px;
}

i {
  font-size: 20px;
  margin-right: 5px;
  position: relative;
  bottom: 2px;
}

.menuitem:after {
  display: block;
  width: 0%;
  left: 50%;
  position: absolute;
  content: "";
  height: 5px;
  background: var(--color-violet);
  -webkit-transition: width 0.3s ease-in-out;
  -moz--transition: width 0.3s ease-in-out;
  transition: width 0.3s ease-in-out;
  -webkit-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  transform: translateX(-50%);
}

.menuitem:hover:after {
  width: 100%;
}

a {
  text-decoration: none;
  text-transform: uppercase;
  color: #747474;
  /* font-weight: bold; */
  height: 100%;
}

a:active {
  text-decoration: none;
}

a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
  color: var(--color-violet);
}
</style>
