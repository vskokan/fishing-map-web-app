<template>
  <div class="userprofile">
    <div class="userinfo">
      <div class="userrow">
        <img class="avatar" :src="'http://localhost:3000/' + oneUser.avatar" />
        <div class="login">{{ oneUser.login }}</div>
      </div>
      <div class="location">
        <div class="label">
          <i class="fas fa-map-marker-alt"></i>
        </div>
        <div class="value">
          {{ oneUser.location }}
        </div>
      </div>
      <div class="rating">
        <div class="label">Рейтинг пользователя:</div>
        <div class="value">
          {{ oneUser.rating }}
        </div>
      </div>
      <div class="reviews">
        <div class="label">Отзывов оставлено:</div>
        <div class="value">
          {{ oneUser.reviewsAmount }}
        </div>
      </div>
      <div class="name">
        <div class="label">Имя:</div>
        <div class="value">
          {{ oneUser.name }}
        </div>
      </div>
      <div class="status">
        <div class="label">Статус:</div>
        <div class="value">
          {{ oneUser.admin ? "Администратор" : "Обычный пользователь" }}
        </div>
      </div>
      <div class="fish">
        <div class="label">Чаще всего ловит:</div>
        <div class="value">Карасик</div>
      </div>
      <div class="method">
        <div class="label">Любимый метод:</div>
        <div class="value">Поплавок</div>
      </div>
    </div>
    <div class="map">
      <yandex-map :coords="coords" :zoom="10" @click="onClick">
        <ymap-marker :coords="coords" marker-id="0" v-if="showForm" />
        <ymap-marker
          v-for="review in allReviews"
          :key="review.id"
          marker-id="review.id"
          :coords="[`${review.latitude}`, `${review.longitude}`]"
          @click="
            chooseReview(review);
            move(review.latitude, review.longitude);
          "
          :options="markerIcon"
        />
        <ReviewCard
          class="cardForm"
          v-if="showCard"
          v-bind:review="currentReview"
        />
      </yandex-map>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["login", "reviews"],
  computed: {
    ...mapGetters(["oneUser"]),
    watch: {
      login: function (newVal) {
        // alert(newVal.id)
        this.getUser(newVal);
      },
    },
  },
  methods: {
    ...mapActions(["getUser"]),
  },
  created() {
    this.getUser(this.login);
  },
};
</script>

<style scoped>
.userprofile {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 70vw;
  background-color: #fff;
  padding: 20px;
  border-radius: 15px;
}

.avatar {
  width: 10vw;
  clip-path: circle(5vw at center);
}

.userrow {
  display: flex;
  flex-direction: row;
}

.location,
.rating,
.reviews,
.name,
.status,
.fish,
.method {
  display: flex;
  flex-direction: row;
  margin: 10px;
}



/* MAP */

   .ymap-container {
      /* height: 830px; */
      height: 50vh;
      width:  100%;
    }

    .map {
      position: relative;
      top: 1px;
      width: 100%;
      z-index:0;
      min-height: calc(100vh - 320px)
    }

    yandex-map {
      height: 820px;
      width:  100%;
    }
</style>