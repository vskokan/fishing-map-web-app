import FishData from '../../services/FishData';

export default {
    actions: {
        fetchFishes({ commit, }) {
            FishData.getAll()
            .then(json => {
                const fishes = json.data
                commit('updateFishes', fishes)
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
            commit('loadFish')
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
            state.isFishLoaded = true
        },
        loadFish(state) {
            state.isFishLoaded = false
        }
    },
    state: {
        fishes: [],
        fish: {},
        isFishLoaded: false
    },
    getters: {
        allFishes(state) {
            return state.fishes
        },
        currentFish(state) {
            return state.fish
        },
        isFishLoaded(state) {
            return state.isFishLoaded
        }
    },
}