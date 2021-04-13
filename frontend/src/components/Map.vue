<template>
  <div class="map">
    <!-- <h2>Тут карта</h2> -->
    <!-- <yandex-map :coords="coords" @click="onClick">
            <ymap-marker 
                marker-id="123" 
                :coords="coords"
                :balloon-template="balloonTemplate"
            ></ymap-marker>
        </yandex-map> -->
    <MapFilters />
    <yandex-map
      :coords="coords"
      :zoom="10"
      @click="onClick"
      :cluster-options="clusterOptions"
    >
      <!-- <ymap-marker v-click-outside="hide" @click="toggle(review)" v-for="review of reviews" :key="review" :icon="markerIcon"
                marker-id="review.id" 
                :coords= "[`${review.latitude}`, `${review.longitude}`]"
                :balloon-template="mapBalloon(review)"
            >
            </ymap-marker> -->
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
        cluster-name="1"
        :icon="markerIcon"
      />
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
    </yandex-map>
    <transition name="fade">
      <AddReview
        class="addForm"
        v-if="showForm"
        v-bind:latitude="coords[0]"
        v-bind:longitude="coords[1]"
      />
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import MapFilters from "@/components/Reviews/MapFilters";
// import ReviewCard from '@/components/Reviews/AdminPanel/ReviewCard'
import AddReview from "@/components/Reviews/AddReview";
import ReviewCard from "@/components/Reviews/ReviewCard";
import DepartmentCard from "@/components/Shops/DepartmentCard";
// import ClickOutside from 'vue-click-outside'

export default {
  //props: ['reviews'],
  //computed:
  data: () => {
    return {
      coords: [54.62880826189078, 39.75270322600586],
      zoom: 12,
      //opened: false,
      markerIcon: {
        layout: "default#image",
        // imageHref: 'http://localhost:3000/assets/map-marker.svg',
        imageHref: "http://localhost:3000/uploads/map-marker.svg",
        imageSize: [35, 50],
        //imageOffset: [-15, -45],
        imageOffset: [-15, -45],
        // preset: "islands#violetIcon",
      },
      markerIconPartner: {
        layout: "default#image",
        // imageHref: 'http://localhost:3000/assets/map-marker.svg',
        imageHref: "http://localhost:3000/uploads/map-marker-dollar.svg",
        imageSize: [25, 40],
        //imageOffset: [-15, -45],
        imageOffset: [-15, -45],
        // preset: "islands#violetIcon",
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
      filters: {},
    };
  },
  components: { ReviewCard, AddReview, MapFilters, DepartmentCard },
  computed: {
    ...mapGetters([
      "allReviews",
      "showCard",
      "showDepartmentCard",
      "showForm",
      "isAuth",
      "getFilters",
      "allDepartments",
    ]),
    // reviews: function() {
    //   return this.allReviews
    // },
    balloonTemplate() {
      return `
        <h1 class="red">Hi, everyone!</h1>
        <p>I am here: ${this.coords}</p>
      `;
    },
  },
  methods: {
    ...mapActions(["fetchReviews", "fetchDepartments"]),
    ...mapMutations([
      "changeFormView",
      "changeCardView",
      "changeEditFormView",
      "changeDepartmentCardView",
    ]),
    onClick(e) {
      this.coords = e.get("coords");

      if (this.isAuth) this.changeFormView();
      // alert(this.showForm)
    },
    move(lat, long) {
      this.coords = [lat, long];
    },
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

    // toggle (review) {
    //   this.opened = true
    //   this.review = review
    // },
    // hide () {
    //   this.opened = false
    // },
    mapBalloon: function(review) {
      return `
      <div><h1>${review.id}</h1>
      </div>
      `;
    },
  },
  mounted() {
    this.fetchReviews();
    this.fetchDepartments();
    //this.filters = this.getFilters
  },
  // directives: {
  //   ClickOutside
  // },
  // components: {
  //   ReviewCard
  // }
};
</script>

<style scoped>
.ymap-container {
  /* height: 830px; */
  /* height: 73.3vh; */
  height: 78vh;
  width: 100%;
}

.map {
  height: 84vh;
  position: relative;
  top: 1px;
  width: 100%;
  z-index: 0;
  min-height: calc(100vh - 350px);
}

yandex-map {
  height: 800px;
  width: 100%;
}

.addForm,
.cardForm,
.editForm {
  position: relative;
  margin: auto;
  margin-top: -650px;
  margin-left: 420px;
  z-index: 1;
}

.cardForm {
  margin-top: -620px;
  margin-left: 1000px;
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
