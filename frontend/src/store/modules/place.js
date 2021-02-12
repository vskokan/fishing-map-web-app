import PlaceData from '../../services/PlaceData';

export default {
    actions: {
        fetchPlaces({ commit, rootState, dispatch}) {
            PlaceData.getPage(rootState.common.currentPage)
            .then(json => {
                const places = json.data.rows
                commit('updatePlaces', places)
                dispatch('getPlaceMaxPageFromServer')
            })
        },
        fetchPlacesNoPagination({ commit, }) {
            PlaceData.getAll()
            .then(json => {
                const places = json.data
                commit('updatePlaces', places)
            })
        },
        getPlaceMaxPageFromServer({commit}) {
            PlaceData.getAmount()
            .then(json => {
                const places = json.data
                commit('updateMaxPage', places)
            })
        },
        createPlace({ commit, dispatch }, newPlace, places, ) {
            PlaceData.create(newPlace)
            .then(() => {
                dispatch('fetchPlaces')
                .then(() => {commit('updatePlaces', places)})
                
            })
        },
        deletePlace({commit, dispatch}, placeToDelete, places) {
            PlaceData.delete(placeToDelete)
            .then(() => {
                dispatch('fetchPlaces')
                .then(()=>{commit('updatePlaces', places)})
            })
        },
        updatePlace({commit, dispatch}, placeToUpdate, places) {
            PlaceData.update(placeToUpdate.id, placeToUpdate.formData)
            .then(() => {
                dispatch('fetchPlaces')
                .then(() => {
                    commit('updatePlaces', places)
                })
            })
        }
    },
    mutations: {
        updatePlaces(state, places) {
            state.places = places
        },
    },
    state: {
        places: [],
    },
    getters: {
        allPlaces(state) {
            return state.places
        },
    },
}