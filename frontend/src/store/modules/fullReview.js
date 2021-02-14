import FullReviewData from '../../services/FullReviewData';

export default {
    actions: {
        // fetchShortReviews({ commit, }) {
        //     FullReviewData.getAll()
        //     .then(json => {
        //         const reviews = json.data
                
        //         commit('updateReviews', reviews)
        //     })
        // },
        // createFullReview({ commit, dispatch }, newReview, reviews, ) {
        //     FullReviewData.create(newReview)
        //     .then(() => {
        //         dispatch('fetchReviews')
        //         .then(() => {commit('updateReviews', reviews)})
                
        //     })
        // },
        getFullReviewById() {

        }
        // deleteReview({commit, dispatch}, reviewToDelete, reviews) {
        //     ReviewData.delete(reviewToDelete)
        //     .then(() => {
        //         dispatch('fetchReviews')
        //         .then(()=>{commit('updateReviews', reviews)})
        //     })
        // },
        // updateReview({commit, dispatch}, reviewToUpdate, reviews) {
        //     ReviewData.update(reviewToUpdate.id, reviewToUpdate.formData)
        //     .then(() => {
        //         dispatch('fetchReviews')
        //         .then(() => {
        //             commit('updateReviews', reviews)
        //         })
        //     })
        // },
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
    },
    state: {
        reviews: [],
        review: []
    },
    // getters: {
    //     allReviews(state) {
    //         return state.reviews
    //     },
    // },
}