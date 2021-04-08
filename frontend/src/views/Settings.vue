<template>
  <div class="container">
    
    <div class="card">
      <ul class="options">
        <li
          class="option"
          @click="setOption('main')"
          :class="{ 'option active': this.currentOption == 'main' }"
        >
          Основные настройки
        </li>
        <li
          class="option"
          @click="setOption('password')"
          :class="{ 'option active': this.currentOption == 'password' }"
        >
          Смена пароля
        </li>
        <li
          class="option"
          @click="setOption('sessions')"
          :class="{ 'option active': this.currentOption == 'sessions' }"
        >
          Текущие сессии
        </li>
      </ul>
      <div class="divider" />
      <transition name="slide-fade" mode="out-in">
      <Main v-if="currentOption == 'main'" v-bind:user="currentUser" />
      <Password v-if="currentOption == 'password'" v-bind:user="currentUser" />
      <Sessions v-if="currentOption == 'sessions'" v-bind:user="currentUser" />
      </transition>
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from "vuex"

import Main from "@/components/Settings/Main"
import Password from "@/components/Settings/Password"
import Sessions from "@/components/Settings/Sessions"

export default {
  components: {
    Main,
    Password,
    Sessions,
  },
  computed: mapGetters(["currentUser"]),
  data() {
    return {
      currentOption: "main",
      user: {}
    };
  },
  methods: {
    setOption(option) {
      this.currentOption = option;
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 84vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
}

.card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80vw;
  height: 60vh;
  background-color: #fff;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
}

.options {
  width: 15vw;
  list-style: none;
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
   background-color: rgb(243, 243, 243);
   padding: 20px;
   border-radius: 15px;
}

.option {
  background-color: rgb(255, 255, 255);
  padding: 20px;
  border-radius: 15px;
  margin: 10px 0px;
  font-size: 20px;
  color: #000;
  font-family: 'Inter', sans-serif;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
}

.option:hover {
  cursor: pointer;
}

.active {
  background-color: var(--color-violet);
  color: #fff;
}

.divider {
  width: 1px;
  margin: 0px 10px;
  background-color: rgb(255, 255, 255);
}

    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to {
        opacity: 0;
    }
</style>