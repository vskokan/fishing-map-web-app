import ReviewData from '../../services/ReviewData';
import FullReviewData from '../../services/FullReviewData';


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
        fetchReviews({ commit, }, filters) {
            ReviewData.getAll(filters)
            .then(json => {
                const reviews = json.data.reviews
                console.log(reviews)
               // console.log(filters.startsWith('user'))
                if (filters !== undefined && filters.startsWith('user')) {
                    commit('updateUserReviews', reviews)
                    //commit('stopReviewsLoader')
                }
                commit('updateReviews', reviews)
                commit('stopReviewsLoader')
            })
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
            ReviewData.getOne(reviewId)
            .then((json) => {
                const review = json.data.review
                commit('updateReview', review)
                commit('stopReviewLoader')
            })
        },
        createFullReview({ commit, dispatch }, newReview, reviews, ) {
            FullReviewData.create(newReview)
            .then(() => {
                dispatch('fetchReviews')
                .then(() => {commit('updateReviews', reviews)})
                
            })
        },
        deleteReview({commit, dispatch}, reviewToDelete, reviews) {
            ReviewData.delete(reviewToDelete)
            .then(() => {
                dispatch('fetchReviews')
                .then(()=>{commit('updateReviews', reviews)})
            })
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
        getReviewPhotos({commit}, review) {
            ReviewData.getPhotos(review)
            .then((json) => {
                if (json.status === 200) {
                    const photos = json.data
                    console.log(photos)
                    commit('updatePhotos', photos)
                }
            })
        },
        getOptions({commit},) {
            ReviewData.getOptions()
            .then((json) => {
                const options = json.data
                console.log(options)
                commit('updateOptions', options)
            })
        }
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
    },
    mutations: {
        updateReviews(state, reviews) {
            state.reviews = reviews
        },
        updateReview(state, review) {
            state.review = review
        },
        updatePhotos(state, photos) {
            state.reviewPhotos = photos
        },
        updateOptions(state, options) {
            state.options = options
        },
        updateUserReviews(state, reviews) {
            state.userReviews = reviews
        },
        stopReviewLoader(state) {
            state.reviewLoader = false
            // setTimeout(() => {
            //     state.reviewLoader = false
            // }, 1500)
        },
        stopReviewsLoader(state) {
            state.reviewsLoader = false
            // setTimeout(() => {
            //     state.reviewLoader = false
            // }, 1500)
        }
    },
    state: {
        reviews: [],
        review: {},
        userReviews: [],
        reviewLoader: true,
        reviewsLoader: true,
        options: {
            baiting: [],
            road: [],
            time: []
        }
    },
    getters: {
        allReviews(state) {
            //alert(state.reviews)
            return state.reviews
        },
        currentReview(state) {
            return state.review
        },
        allPhotos(state) {
            return state.reviewPhotos
        },
        options(state) {
            return state.options
        },
        isReviewLoading(state) {
            return state.reviewLoader
        },
        areReviewsLoading(state) {
            return state.reviewsLoader
        },
        userReviews(state) {
            return state.userReviews
        }
    },
}