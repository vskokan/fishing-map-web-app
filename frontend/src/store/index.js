import Vue from "vue";
import Vuex from "vuex";
import bait from "./modules/bait";
import method from "./modules/method";
import fish from "./modules/fish";
import user from "./modules/user";
import review from "./modules/review";
import fact from "./modules/fact";
import companies from "./modules/companies";
import department from "./modules/department";
import geo from "./modules/geo";
import plan from "./modules/plan";
import auth from "./modules/auth";

import common from "./modules/common";

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    bait,
    common,
    method,
    fish,
    user,
    review,
    fact,
    companies,
    department,
    geo,
    plan,
    auth,
  },
});
