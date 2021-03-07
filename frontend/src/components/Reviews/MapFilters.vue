<template>
  <div class="filterPanel">
    <div class="filters">
      <div class="filter">
        <div class="clear">
          <i class="fas fa-times"></i>
        </div>
        <Multiselect
          class="multiselect optional"
          v-model="filters.baiting"
          :options="options.baiting"
          label="description"
          track-by="id"
          :multiple="true"
          :close-on-select="true"
          :clear-on-select="false"
          :preserve-search="true"
          placeholder="Укажите качество клёва"
          :preselect-first="false"
        />
      </div>

      <div class="filter">
        <div class="clear">
          <i class="fas fa-times"></i>
        </div>
        <Multiselect
          class="multiselect optional"
          v-model="filters.road"
          :options="options.road"
          label="description"
          track-by="id"
          :multiple="true"
          :close-on-select="true"
          :clear-on-select="false"
          :preserve-search="true"
          placeholder="Укажите качество дороги"
          :preselect-first="false"
        />
      </div>
      <div class="filter">
        <div class="clear">
          <i class="fas fa-times"></i>
        </div>
        <Multiselect
          class="multiselect optional"
          v-model="filters.fishes"
          :options="allFishes"
          label="name"
          track-by="id"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          placeholder="Выберите рыбу"
          :preselect-first="false"
        />
      </div>
      <div class="filter" v-if="filtersOptions.users">
        <div class="clear">
          <i class="fas fa-times"></i>
        </div>
        <Multiselect
          class="multiselect optional"
          v-model="filters.users"
          :options="allUsers"
          label="login"
          track-by="id"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          placeholder="Выберите пользователя"
          :preselect-first="false"
        />
      </div>
      <div class="filter">
          <label for="photo">Только с фото</label>
          <input type="checkbox" id="photo" v-model="filters.photos">
      </div>
      <div class="filter" v-if="filtersOptions.reports">
          <label for="reports">С жалобами</label>
          <input type="checkbox" id="reports" v-model="filters.reports">
      </div>
      <div class="filter">
          <label for="rating">Рейтинг от </label>
          <input type="text" id="rating" v-model="filters.ratingMoreThan">
      </div>
    </div>
    <div class="buttons">
      <button class="clear">Очистить</button>
      <button class="apply">Обновить</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
//import { mapMutations } from "vuex";
import { mapGetters } from "vuex";

import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect,
  },
  computed: mapGetters(["allFishes", "allMethods", "options", "allUsers"]),
  methods: {
    ...mapActions([
      "fetchFishesNoPagination",
      "fetchReviewsNoPagination",
      "getOptions",
      "fetchUsersNoPagination"
    ]),
  },
  data() {
    return {
      filters: {
        users: [],
        photos: "",
        baiting: [],
        road: [],
        fishes: [],
        reports: "",
        ratingMoreThan: "",
      },
      filtersOptions: {
          users: false,
          reports: false,
          baiting: true,
          photos: true,
          road: true,
          fishes: true,
          rating: true
      }
    };
  },
  created() {
    this.fetchFishesNoPagination()
    this.getOptions()
    this.fetchUsersNoPagination()
  },
};
</script>


<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
@import "./../../styles/multiselect.css";
</style>

<style scoped>
    .filterPanel {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        background-color: #fff;
        padding: 20px;
    }

    .filters {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .filter {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin: 0px 10px;
        align-items: center;
    }

</style>