import ReviewData from "../../services/ReviewData";

export default {
  actions: {
    getOne({ commit }, reviewId) {
      ReviewData.getOne(reviewId).then((json) => {
        const review = json.data.review;
        commit("updateReview", review);
        commit("stopReviewLoader");
      });
    },
    createFullReview({ commit, dispatch }, newReview, reviews) {
      ReviewData.create(newReview).then(() => {
        dispatch("fetchReviews").then(() => {
          commit("updateReviews", reviews);
        });
      });
    },
    fetchReviews({ commit, state }, filters) {
      ReviewData.getAll(filters).then((json) => {
        const reviews = json.data;
        if (filters !== undefined && filters.startsWith("user")) {
          commit("updateUserReviews", reviews);
        }
        function compareArrays(array1, array2) {
          let commonElements = false;
          array1.forEach((elem1) => {
            array2.forEach((elem2) => {
              if (elem1 == elem2) commonElements = true;
            });
          });
          return commonElements;
        }

        function reviewFilter(review) {
          if (
            (state.filters.users.length == 0 ||
              state.filters.users.includes(review.login)) &&
            (state.filters.baiting.length == 0 ||
              state.filters.baiting.includes(review.baitingId)) &&
            (state.filters.onlyWithPhotos == false ||
              (state.filters.onlyWithPhotos == true && review.photos > 0)) &&
            (state.filters.road.length == 0 ||
              state.filters.road.includes(review.roadId)) &&
            (state.filters.ratingMoreThan.length == 0 ||
              state.filters.ratingMoreThan <= review.reviewRating) &&
            (state.filters.fishes.length == 0 ||
              compareArrays(review.fishes, state.filters.fishes))&& 
              (state.filters.reports == false || 
                state.filters.reports == true && review.reports !== '0')
          ) {
            return true;
          }
          return false;
        }

        const filteredReviews = reviews.filter(reviewFilter);
        commit("updateReviews", filteredReviews);
        commit("stopReviewsLoader");
      });
    },

    filterReviews({ dispatch }) {
      dispatch("fetchReviews");
    },

    getFilters({ commit, dispatch }, filters, reviews) {
      commit("updateFilters", filters);
      dispatch("fetchReviews").then(() => {
        commit("updateReviews", reviews);
      });
    },
    resetFilters({ commit, dispatch }, reviews) {
      commit("clearFilters");
      dispatch("fetchReviews").then(() => {
        commit("updateReviews", reviews);
      });
    },
    deleteReview({ commit, dispatch }, reviewToDelete, reviews) {
      ReviewData.delete(reviewToDelete).then(() => {
        dispatch("fetchReviews").then(() => {
          commit("updateReviews", reviews);
        });
      });
    },
    getReviewPhotos({ commit }, review) {
      ReviewData.getPhotos(review).then((json) => {
        if (json.status === 200) {
          const photos = json.data;
          console.log(photos);
          commit("updatePhotos", photos);
        }
      });
    },
    getOptions({ commit }) {
      ReviewData.getOptions().then((json) => {
        const options = json.data;
        console.log(options);
        commit("updateOptions", options);
      });
    },
    updateStats({ commit, dispatch }, data, review) {
      console.log(data.review)
      console.log(data.stats)
      ReviewData.updateStats(data.review, data.stats).then(() => {
        dispatch("fetchReviews").then(() => {
          commit("updateReviews");
        })
        .then(() => {
          dispatch("getOne", data.review).then(() => {
            commit("updateReview", review);
            commit("stopReviewLoader");
          })
        })
      });
    },
  },
  mutations: {
    updateReviews(state, reviews) {
      state.reviews = reviews;
      state.filteredReviews = reviews;
    },
    updateReview(state, review) {
      state.review = review;
    },
    updatePhotos(state, photos) {
      state.reviewPhotos = photos;
    },
    updateOptions(state, options) {
      state.options = options;
    },
    updateUserReviews(state, reviews) {
      state.userReviews = reviews;
    },
    stopReviewLoader(state) {
      state.reviewLoader = false;
    },
    stopReviewsLoader(state) {
      state.reviewsLoader = false;
    },
    updateFilters(state, filters) {
      state.filters.users = filters.users;
      state.filters.onlyWithPhotos = filters.onlyWithPhotos;
      state.filters.baiting = filters.baiting;
      state.filters.road = filters.road;
      state.filters.fishes = filters.fishes;
      state.filters.reports = filters.reports;
      state.filters.ratingMoreThan = filters.ratingMoreThan;
    },
    clearFilters(state) {
      state.filters = {
        users: [],
        onlyWithPhotos: false,
        baiting: [],
        road: [],
        fishes: [],
        reports: false,
        ratingMoreThan: "",
      };
    },
    updateFilteredReviews(state, reviews) {
      state.filteredReviews = reviews;
    },
  },
  state: {
    reviews: [],
    filteredReviews: [],
    filters: {
      users: [],
      onlyWithPhotos: false,
      baiting: [],
      road: [],
      fishes: [],
      reports: false,
      ratingMoreThan: "",
    },
    review: {},
    userReviews: [],
    reviewLoader: true,
    reviewsLoader: true,
    options: {
      baiting: [],
      road: [],
      time: [],
    },
    reviewPhotos: []
  },
  getters: {
    allReviews(state) {
      return state.reviews;
    },
    filteredReviews(state) {
      return state.filteredReviews;
    },
    currentReview(state) {
      return state.review;
    },
    allPhotos(state) {
      return state.reviewPhotos;
    },
    options(state) {
      return state.options;
    },
    isReviewLoading(state) {
      return state.reviewLoader;
    },
    areReviewsLoading(state) {
      return state.reviewsLoader;
    },
    userReviews(state) {
      return state.userReviews;
    },
    reviewFilters(state) {
      return state.filters;
    },
  },
};


