import FishData from '../../services/FishData';

export default {
    actions: {
        fetchFishes({ commit,  rootState, dispatch}) {
            FishData.getPage(rootState.common.currentPage)
            .then(json => {
                const fishes = json.data.rows
                console.log(fishes)
                commit('updateFishes', fishes)
                dispatch('getFishMaxPageFromServer')
            })
        },
        fetchFishesNoPagination({ commit, }) {
            FishData.getAll()
            .then(json => {
                const fishes = json.data
                commit('updateFishes', fishes)
            })
        },
        getFishMaxPageFromServer({commit}) { 
            FishData.getAmount()
            .then(json => {
                const fishes = json.data
                commit('updateMaxPage', fishes)
            })
        },
        createFish({ commit, dispatch }, newFish, fishes, ) {
            FishData.create(newFish)
            .then(() => {
                dispatch('fetchFishes')
                .then(() => {commit('updateFishes', fishes)})
                
            })
        },
        deleteFish({commit, dispatch}, fishToDelete, fishes) {
            FishData.delete(fishToDelete)
            .then(() => {
                dispatch('fetchFishes')
                .then(()=>{commit('updateFishes', fishes)})
            })
        },
        updateFish({commit, dispatch}, fishToUpdate, fishes) {
            FishData.update(fishToUpdate.id, fishToUpdate.formData)
            .then(() => {
                dispatch('fetchFishes')
                .then(() => {
                    commit('updateFishes', fishes)
                })
            })
        },
        fetchFish({commit, }, fish) {
            FishData.get(fish)
            .then((json) => {
                const fish = json.data
                commit('updateFish', fish)
            })
        }
    },
    mutations: {
        updateFishes(state, fishes) {
            state.fishes = fishes
        },
        updateFish(state, fish) {
            state.fish = fish
        }
    },
    state: {
        fishes: [],
        fish: {}
    },
    getters: {
        allFishes(state) {
            return state.fishes
        },
        currentFish(state) {
            return state.fish
        }
    },
}