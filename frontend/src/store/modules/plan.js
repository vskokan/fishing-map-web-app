import PlanData from "../../services/PlanData";

export default {
  actions: {
    fetchPlans({ commit }) {
      PlanData.get().then((json) => {
        const plans = json.data;
        commit("updatePlans", plans);
      });
    },
    createPlan({ commit, dispatch }, newPlan, plans) {
      PlanData.create(newPlan).then(() => {
        dispatch("fetchPlans").then(() => {
          commit("updatePlans", plans);
        });
      });
    },
    deletePlan({ commit, dispatch }, planToDelete, plans) {
      PlanData.delete(planToDelete).then(() => {
        dispatch("fetchPlans").then(() => {
          commit("updatePlans", plans);
        });
      });
    },
    updatePlan({ commit, dispatch }, planToUpdate, plans) {
      PlanData.update(planToUpdate).then(() => {
        dispatch("fetchPlans").then(() => {
          commit("updatePlans", plans);
        });
      });
    },
  },
  mutations: {
    updatePlans(state, plans) {
      state.plans = plans;
      state.loaded = true;
    },
    startPlanCreation(state) {
        state.creation = true
    },
    endPlanCreation(state) {
        state.creation = false
    }
  },
  state: {
    plans: [],
    loaded: false,
    creation: false,
    edition: false
  },
  getters: {
    allPlans(state) {
      return state.plans;
    },
    plansAreLoaded(state) {
      return state.loaded;
    },
    planCreation(state) {
        return state.creation
    },
    planEdition(state) {
        return state.edition
    }
  },
};
