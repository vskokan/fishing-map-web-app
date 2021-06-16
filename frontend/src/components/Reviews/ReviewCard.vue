<template>
  <div class="card" v-if="!isReviewLoading">
    <div>
      <div class="reviewHeader">
        <div class="userInfo">
          <img
            class="avatar"
            :src="'http://localhost:3000/' + currentReview.baseInfo.avatar"
          />
          <div class="login">
            <div class="link">
              <router-link :to="'/user/' + currentReview.baseInfo.login">{{
                currentReview.baseInfo.login
              }}</router-link>
            </div>
            <div class="userRating">
              <i class="fas fa-trophy"></i
              >{{ currentReview.baseInfo.userRating }}
            </div>
          </div>
        </div>
        <div class="reviewInfo">
          <p class="date">
            <i class="fas fa-calendar-alt"></i>{{ currentReview.baseInfo.date }}
          </p>
          <p class="reviewRating">
            <i class="fas fa-minus" @click="voteOrReport('vote', -1)" />
            {{ currentReview.rating }}
            <i class="fas fa-plus" @click="voteOrReport('vote', 1)" />
          </p>
          <div class="report" @click="voteOrReport('report', true)">
            <i class="fas fa-exclamation-triangle"></i>Пожаловаться
          </div>
        </div>
      </div>
      <p class="description">{{ currentReview.baseInfo.description }}</p>
      <div class="info">
        <div class="road">
          <i class="fas fa-car"></i
          >{{
            currentReview.baseInfo.roadDescription !== null
              ? currentReview.baseInfo.roadDescription
              : "Не указано"
          }}
        </div>
        <div class="baiting">
          <i
            :class="{
              'fas fa-fish': currentReview.baseInfo.baitingDescription,
              'fas fa-thumbs-down': !currentReview.baseInfo.baitingDescription,
            }"
          ></i
          >{{ currentReview.baseInfo.baitingDescription }}
        </div>
        <div class="time">
          <i class="fas fa-clock"></i
          >{{
            currentReview.baseInfo.timeDescription !== null
              ? currentReview.baseInfo.timeDescription
              : "Не указано"
          }}
        </div>
      </div>
      <Facts v-bind:review="currentReview" />
      <ReviewPhotos v-bind:review="currentReview" />
    </div>
    <div class="remove" v-if="currentUser.admin" @click="removeReview"><i class="fas fa-trash"></i>Удалить</div>
    <div class="formButtons">
      <button class="button-simple close" v-on:click="closeForm">
        Закрыть
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import Facts from "@/components/Reviews/Facts.vue";
import ReviewPhotos from "@/components/Reviews/ReviewPhotos.vue";

export default {
  props: ["review"],
  components: {
    Facts,
    ReviewPhotos,
  },
  computed: mapGetters(["currentReview", "isReviewLoading", "currentUser"]),
  watch: {
    review: function(newVal) {
      this.getOne(newVal.id);
    },
  },
  methods: {
    ...mapMutations(["changeCardView"]),
    ...mapActions(["findFactsByReview", "getOne", "updateStats", "deleteReview"]),
    closeForm() {
      this.changeCardView();
    },
    voteOrReport(type, value) {
      const formData = new FormData();
      formData.append("type", type);
      formData.append("value", value);
      formData.append("login", this.currentUser.login);
      this.updateStats({ review: this.review.id, stats: formData });
    },
    removeReview() {
      this.deleteReview(this.review.id)
      .then(() => { this.changeCardView()})
    }
  },
  created() {
    this.getOne(this.review.id);
  },
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  width: 700px;
  color: #000;
  min-height: 250px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding-bottom: 20px;
  border-radius: 15px;
  /* box-shadow: rgba(0, 0, 0, 0.11) 0px 10px 50px; */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.26);
  font-style: normal;
  /* box-shadow: 0 0 60px rgba(14,42,71,.25); */
}

.name {
  margin-top: 10px;
  font-family: "Inter", sans-serif;
}

.description {
  margin: 10px;
  margin-bottom: 20px;
  font-family: "Rubik", sans-serif;
  font-size: 20px;
  width: 500px;
  text-align: left;
  margin-left: 30px;
}

.info {
  display: flex;
  flex-direction: row;
  /* width: 550px; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  font-family: "Inter", sans-serif;
}

.road,
.baiting,
.time {
  display: flex;
  flex-direction: column;
  width: 150px;
}

.fas {
  margin-right: 5px;
}

.avatar {
  width: 90px;
  height: 90px;
  clip-path: circle(45px at center);
  margin-right: 5px;
  object-fit: cover;
}

.userInfo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
  margin-left: 10px;
}

.reviewInfo {
  margin-top: 20px;
  margin-right: 10px;
}

.reviewHeader {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.login {
  font-size: 32px;
  margin-left: 5px;
  font-family: "Baloo Chettan 2", cursive;
  /* font-weight: bold; */
}

.userRating {
  font-size: 18px;
  display: flex;
  justify-content: flex-start;
  margin-left: 5px;
  /* font-size: 32px; */
}

.fa-plus,
.fa-munis {
  margin-left: 5px;
  margin-right: 5px;
}

.fa-plus:hover,
.fa-minus:hover {
  cursor: pointer;
  color: var(--color-violet);
}

.report:hover {
  cursor: pointer;
  color: var(--color-violet);
}

.button-simple {
  margin-top: 25px;
}

.reviewRating {
  font-size: 18px;
  margin-top: 5px;
}

a {
  text-decoration: none;
  color: #000;
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
}

.remove {
  margin-top: 10px;
}

.remove:hover {
  color: var(--color-violet);
  cursor: pointer;
}
</style>
