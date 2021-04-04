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
      <Main v-if="currentOption == 'main'" v-bind:user="currentUser" />
      <Password v-if="currentOption == 'password'" v-bind:user="currentUser" />
      <Sessions v-if="currentOption == 'sessions'" v-bind:user="currentUser" />
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
  height: 79.4vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
}

.card {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 80vw;
  height: 60vh;
  background-color: #fff;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
}

.options {
  list-style: none;
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.option {
  background-color: rgb(241, 241, 241);
  padding: 20px;
  border-radius: 15px;
  margin: 10px 0px;
  font-size: 20px;
  color: #000;
  font-family: 'Inter', sans-serif;
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
  margin: 0px 40px;
  background-color: rgb(219, 217, 217);
}
</style>