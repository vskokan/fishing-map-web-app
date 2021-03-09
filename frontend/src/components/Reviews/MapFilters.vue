<template>
  <div class="filterPanel">
    <div class="filters">
      <div class="filter">
        <div class="clear">
          <i class="fas fa-times"></i>
        </div>
        <Multiselect
          class="multiselect baiting"
          v-model="filters.baiting"
          :options="options.baiting"
          label="description"
          track-by="id"
          :limit="1"
          :limitText="count => `и еще ${count}`"
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
          class="multiselect road"
          v-model="filters.road"
          :options="options.road"
          label="description"
          track-by="id"
          :limit="1"
          :limitText="count => `и еще ${count}`"
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
          class="multiselect fishes"
          v-model="filters.fishes"
          :options="allFishes"
          label="name"
          track-by="id"
          :multiple="true"
          :limit="2"
          :limitText="count => `и еще ${count}`"
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
          <div class="switchBody" :class="{'switchBody switch_turned': filters.photos == true }"  @click="filters.photos = !filters.photos">
            <div class="switch"></div>
          </div>
          <input type="checkbox" id="photo" v-model="filters.photos" v-show="false">
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
      <button class="clear button-simple" >Очистить</button>
      <button class="apply button-simple"><i class="fas fa-sync-alt"></i></button>
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
        photos: false,
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
        font-family: 'Inter', sans-serif;
        color: #000;
        height: 60px;
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

    .baiting, .road {
      width: 350px;
    }

    .fishes {
      width: 400px;
    }

    .clear {
      margin-right: 7px;
    }

    #rating, #rating:focus {
      width: 60px;
      border: none;
      border-bottom: 1px solid #000;
      outline: none;
      margin-left: 5px;
      color: var(--color-violet);
      font-size: 18px;
      text-align: center;
    }

    .switchBody {
      
      width: 40px;
      height: 25px;
      padding: 0px 5px;
      border-radius: 25px;
      display: flex;
      /* justify-content: flex-end; */
      justify-content: center;
      align-items: center;
      justify-content: flex-start;
      background-color: var(--color-lightgray);
      transition: all 0.3s;
      margin-left: 10px;
    }

    .switchBody:hover {
      cursor: pointer;
    }

    .switch_unturned {
        justify-content: flex-start;
        background-color: var(--color-lightgray);
    }

    .switch_turned {
      justify-content: flex-end;
      background-color: var(--color-violet);
    }

    .switch {
      background-color: rgb(255, 255, 255);
      height: 20px;
      width: 20px;
      border-radius: 50%;
      box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
      /* margin-left: 5px; */
    }

    .buttons {
      display: flex;
      align-items: center;
    }

    .clear {
      font-size: 16px;
    }

    .apply {
      padding: 10px;
      display: flex;
      align-items: center;
    }

    /* .clear, .apply {
      font-size: 14px;
      padding: 10px;
    } */

</style>