import ReviewData from "../../services/ReviewData";
import FullReviewData from "../../services/FullReviewData";

export default {
  actions: {
    // fetchReviews({ commit, rootState, dispatch}) {
    //     ReviewData.getPage(rootState.common.currentPage)
    //     .then(json => {
    //         const reviews = json.data.rows
    //         //console.log(reviews)
    //         commit('updateReviews', reviews)
    //         dispatch('getReviewMaxPageFromServer')
    //     })
    // },
    fetchReviews({ commit, state }, filters) {
      ReviewData.getAll(filters).then((json) => {
        const reviews = json.data.reviews;
        console.log(reviews);
        // console.log(filters.startsWith('user'))
        if (filters !== undefined && filters.startsWith("user")) {
          commit("updateUserReviews", reviews);
          //commit('stopReviewsLoader')
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
              compareArrays(review.fishes, state.filters.fishes))
            // && (state.filters.fishes.length == 0 || review.fishes.forEach(fish => {state.filters.fishes.includes(fish)}))
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
      //commit('getFilters', filters)

      // function reviewFilter(review) {
      //     if ((filters.users.length == 0 || filters.users.includes(review.login))
      //     && (filters.baiting.length == 0 || filters.baiting.includes(review.baitingId))) {
      //         return true
      //     }
      //     return false
      // }

      // const filteredReviews = state.reviews.filter(reviewFilter)
      dispatch("fetchReviews");
      // commit('updateReviews', filteredReviews)
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
    // getReviewMaxPageFromServer({commit}) {
    //     ReviewData.getAmount()
    //     .then(json => {
    //         const reviews = json.data
    //         commit('updateMaxPage', reviews)
    //     })
    // },
    // createReview({ commit, dispatch }, newReview, reviews, ) {
    //     ReviewData.create(newReview)
    //     .then(() => {
    //         dispatch('fetchReviews')
    //         .then(() => {commit('updateReviews', reviews)})

    //     })
    // },
    getOne({ commit }, reviewId) {
      ReviewData.getOne(reviewId).then((json) => {
        const review = json.data.review;
        commit("updateReview", review);
        commit("stopReviewLoader");
      });
    },
    createFullReview({ commit, dispatch }, newReview, reviews) {
      FullReviewData.create(newReview).then(() => {
        dispatch("fetchReviews").then(() => {
          commit("updateReviews", reviews);
        });
      });
    },
    deleteReview({ commit, dispatch }, reviewToDelete, reviews) {
      ReviewData.delete(reviewToDelete).then(() => {
        dispatch("fetchReviews").then(() => {
          commit("updateReviews", reviews);
        });
      });
    },
    // updateReview({commit, dispatch}, reviewToUpdate, reviews) {
    //     ReviewData.update(reviewToUpdate.id, reviewToUpdate.formData)
    //     .then(() => {
    //         dispatch('fetchReviews')
    //         .then(() => {
    //             commit('updateReviews', reviews)
    //         })
    //     })
    // },
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
    // filterReviews({commit}, getters) {
    //     //commit('getFilters', filters)
    //     alert('dikehflfjk')
    //     function reviewFilter(review) {
    //         if ((state.filters.users.length == 0 || state.filters.users.includes(review.login))
    //         && (state.filters.baiting.length == 0 || state.filters.baiting.includes(review.baitingId))) {
    //             return true
    //         }
    //         return false
    //     }
    //     let filtered = []

    //     if (Object.keys(state.filters).length == 0) {
    //         filtered = getters.allReviews
    //     } else filtered = getters.allReviews.filter(reviewFilter)

    //     commit('updateFilteredReviews', filtered)
    // }
    // updateReviewPassword_AdminPanel({commit, dispatch}, reviewToUpdate, reviews) {
    //     //alert(ReviewToUpdate.formData)
    //     ReviewData.updatePassword(reviewToUpdate.login, reviewToUpdate.formData)
    //         .then(() => {
    //             dispatch('fetchReviews')
    //             .then(() => {
    //                 commit('updateReviews', reviews)
    //             })
    //         })
    // }
    updateStats({commit, dispatch}, review, data) { // поставить оценку или пожаловаться
      ReviewData.updateStats(review, data)
      .then(()=> {
        dispatch('fetchReviews')
        .then(( )=> {
          commit('updateReviews')
        })
      })
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
      // setTimeout(() => {
      //     state.reviewLoader = false
      // }, 1500)
    },
    stopReviewsLoader(state) {
      state.reviewsLoader = false;
      // setTimeout(() => {
      //     state.reviewLoader = false
      // }, 1500)
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
        reports: "",
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
      reports: "",
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
  },
  getters: {
    allReviews(state) {
      return state.reviews;

      //  function reviewFilter(review) {
      //     if ((state.filters.users.length == 0 || state.filters.users.includes(review.login))
      //     && (state.filters.baiting.length == 0 || state.filters.baiting.includes(review.baitingId))) {
      //         return true
      //     }
      //     return false
      // }
      //let filtered = []

      // if (Object.keys(state.filters).length == 0) {
      //     return state.reviews
      // } else return state.reviews.filter(reviewFilter)
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
