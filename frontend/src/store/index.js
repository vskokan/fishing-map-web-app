import Vue from 'vue'
import Vuex from 'vuex'
import bait from './modules/bait'
import method from './modules/method'
import district from './modules/district'
import place from './modules/place'
import fish from './modules/fish'
import user from './modules/user'
import review from './modules/review'
import fact from './modules/fact'
import fullReview from './modules/fullReview'
import auth from './modules/auth'

import common from './modules/common'


Vue.use(Vuex)
export default new Vuex.Store({   
    modules: {
        bait, 
        common, 
        method, 
        district,
        fish,
        place,
        user,
        review,
        fact,
        fullReview,
        auth
    },
})


