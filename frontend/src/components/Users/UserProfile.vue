<template>
  <div class="userprofile" v-if="!isUserLoading">
    <div class="userinfo">
      <div class="pic">
        <img class="avatar" :src="'http://localhost:3000/' + oneUser.avatar" />
      </div>
      <div class="login">{{ oneUser.login }}</div>
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
      <!-- <div class="fish">
        <div class="label">*Чаще всего ловит:</div>
        <div class="value">Карась</div>
      </div>
      <div class="method">
        <div class="label">*Любимый метод:</div>
        <div class="value">Поплавок</div>
      </div> -->
      <!-- <div v-for="review in userReviews"
          :key="review.id" >
         Отзыв {{review.id}}</div> -->
    </div>
    <div class="map">
      <yandex-map :coords="coords" :zoom="8" :cluster-options="clusterOptions">
        <!-- <ymap-marker v-click-outside="hide" @click="toggle(review)" v-for="review of reviews" :key="review" :icon="markerIcon"
                marker-id="review.id" 
                :coords= "[`${review.latitude}`, `${review.longitude}`]"
                :balloon-template="mapBalloon(review)"
            >
            </ymap-marker> -->
        <div v-show="!areReviewsLoading">
          <ymap-marker
            v-for="review in userReviews"
            :key="review.id"
            marker-id="review.id"
            :coords="[`${review.latitude}`, `${review.longitude}`]"
            @click="
              chooseReview(review);
              move(review.latitude, review.longitude);
            "
            cluster-name="1"
            :icon="markerIcon"
          />
        </div>

        <ymap-marker
          v-for="department in allDepartments"
          :key="department.id"
          marker-id="departmen.id"
          :coords="[`${department.latitude}`, `${department.longitude}`]"
          cluster-name="1"
          :icon="markerIconPartner"
          @click="
            chooseDepartment(department);
            move(department.latitude, department.longitude);
          "
        />
      </yandex-map>
    </div>
    <transition name="fade">
      <ReviewCard
        class="cardForm"
        v-if="showCard"
        v-bind:review="currentReview"
      />
      <DepartmentCard
        class="cardForm"
        v-if="showDepartmentCard"
        v-bind:department="currentDepartment"
      />
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import ReviewCard from "@/components/Reviews/ReviewCard";
import DepartmentCard from "@/components/Shops/DepartmentCard";
export default {
  props: ["login"],
  data: () => {
    return {
      coords: [54.62880826189078, 39.75270322600586],
      zoom: 12,
      //opened: false,
      // markerIcon: {
      //   // layout: 'default#image',
      //   // imageHref: 'http://localhost:3000/assets/map-marker.svg',
      //   // imageSize: [35, 50],
      //   // imageOffset: [-15, -45],
      //   // // imageOffset: [0, 0],
      //   preset: "islands#violetIcon",
      // },
      markerIcon: {
        layout: "default#image",
        // imageHref: 'http://localhost:3000/assets/map-marker.svg',
        imageHref: "http://localhost:3000/uploads/map-marker.svg",
        imageSize: [35, 50],
        //imageOffset: [-15, -45],
        imageOffset: [-15, -45],
        preset: "islands#violetIcon",
      },
      markerIconPartner: {
        layout: "default#image",
        // imageHref: 'http://localhost:3000/assets/map-marker.svg',
        imageHref: "http://localhost:3000/uploads/map-marker-dollar.svg",
        imageSize: [25, 40],
        //imageOffset: [-15, -45],
        imageOffset: [-15, -45],
        preset: "islands#violetIcon",
      },
      clusterOptions: {
        "1": {
          clusterDisableClickZoom: false,
          clusterOpenBalloonOnClick: false,
          preset: "islands#invertedVioletClusterIcons",
          gridSize: 128,
        },
        "2": {
          clusterDisableClickZoom: false,
          clusterOpenBalloonOnClick: false,
          preset: "islands#invertedGreenClusterIcons",
        },
      },
      currentReview: {},
      currentDepartment: {},
      //reviews: this.allReviews
    };
  },
  components: { ReviewCard, DepartmentCard },
  computed: {
    ...mapGetters([
      "oneUser",
      "userReviews",
      "showCard",
      "areReviewsLoading",
      "isUserLoading",
      "showDepartmentCard",
      "allDepartments",
    ]),
  },
  watch: {
    login: function(newVal) {
      this.getUser(newVal);
      this.fetchReviews(`user=${newVal}`);
    },
  },
  methods: {
    ...mapActions(["getUser", "fetchReviews", "fetchDepartments"]),
    ...mapMutations(["changeCardView", "changeDepartmentCardView"]),
    onClick(e) {
      this.coords = e.get("coords");

      // if (this.isAuth) this.changeFormView();
      // alert(this.showForm)
    },
    move(lat, long) {
      this.coords = [lat, long];
    },
    // chooseReview(review) {
    //   if (!this.showCard) {
    //     // this.changeCardView()
    //     this.currentReview = review;
    //     this.changeCardView();
    //   } else {
    //     // this.changeCardView()
    //     // alert('Закрыли и откроем')
    //     this.currentReview = review;
    //     // this.changeCardView()
    //   }
    //   // this.changeCardView()
    // },
    chooseReview(review) {
      if (this.showDepartmentCard) {
        this.changeDepartmentCardView();
      }
      if (!this.showCard) {
        // this.changeCardView()
        this.currentReview = review;
        this.changeCardView();
      } else {
        // this.changeCardView()
        // alert('Закрыли и откроем')
        this.currentReview = review;
        // this.changeCardView()
      }
      // this.changeCardView()
    },
    chooseDepartment(department) {
      if (this.showCard) {
        this.changeCardView();
      }
      if (!this.showDepartmentCard) {
        // this.changeCardView()
        this.currentDepartment = department;
        this.changeDepartmentCardView();
      } else {
        // this.changeCardView()
        // alert('Закрыли и откроем')
        this.currentDepartment = department;
        // this.changeCardView()
      }
      // this.changeCardView()
    },
  },
  created() {
    this.getUser(this.login);
    this.fetchReviews(`user=${this.login}`);
    this.fetchDepartments();
  },
};
</script>

<style scoped>
.userprofile {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80vw;
  background-color: #fff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
}

.userinfo {
  width: 40vw;
}

.avatar {
  width: 10vw;
  clip-path: circle(5vw at center);
}

/* .userrow {
  display: flex;
  flex-direction: row;
} */

.login {
  font-size: 46px;
  font-family: "Baloo Chettan 2", cursive;
  color: #000;
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
  justify-content: center;
  font-family: "Inter", sans-serif;
  font-size: 20px;
}

.label {
  margin-right: 5px;
  color: #000;
}

.value {
  font-weight: 700;
  color: var(--color-violet);
}

.location .value {
  color: #000;
  font-size: 24px;
}

/* MAP */

.ymap-container {
  /* height: 830px; */
  height: 100%;
  width: 100%;
}

.map {
  position: relative;
  top: 1px;
  width: 100%;
  z-index: 0;
  min-height: calc(100vh - 320px);
}

yandex-map {
  height: 820px;
  width: 100%;
}

.cardForm {
  position: absolute;
  margin: auto 700px;
  /* margin-top: -600px; */
  margin-right: 450px;
  z-index: 1;
}

.cardForm {
  /* margin-top: -620px;
  margin-left: 500px; */
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
