import RegionData from '../../services/RegionData';

export default {
    actions: {
        fetchRegions({ commit, rootState, dispatch}) {
            RegionData.getPage(rootState.common.currentPage)
            .then(json => {
                const regions = json.data.rows
                commit('updateRegions', regions)
                dispatch('getRegionMaxPageFromServer')
            })
        },
        fetchRegionsNoPagination({ commit, }) {
            RegionData.getAll()
            .then(json => {
                const regions = json.data
                commit('updateRegions', regions)
            })
        },
        getRegionMaxPageFromServer({commit}) {
            RegionData.getAmount()
            .then(json => {
                const regions = json.data
                commit('updateMaxPage', regions)
            })
        },
        createRegion({ commit, dispatch }, newRegion, regions, ) {
            RegionData.create(newRegion)
            .then(() => {
                dispatch('fetchRegions')
                .then(() => {commit('updateRegions', regions)})
                
            })
        },
        deleteRegion({commit, dispatch}, regionToDelete, regions) {
            RegionData.delete(regionToDelete)
            .then(() => {
                dispatch('fetchRegions')
                .then(()=>{commit('updateRegions', regions)})
            })
        },
        updateRegion({commit, dispatch}, regionToUpdate, regions) {
            RegionData.update(regionToUpdate.id, regionToUpdate.formData)
            .then(() => {
                dispatch('fetchRegions')
                .then(() => {
                    commit('updateRegions', regions)
                })
            })
        },
        fetchRegionById({commit}, id) {
            RegionData.get(id)
            .then(json => {
                const region = json.data
                console.log('dkeufj')
                console.log(json.data.name)
                //alert(Region.name)
                commit('updateRegion', region)
            })
        }
    },
    mutations: {
        updateRegions(state, regions) {
            state.regions = regions
        },
        updateRegion(state, region) {
            state.region.id = region.id,
            state.region.name = region.name
        }
        // updateMaxPage(state, Regions) {
        //     state.maxPage = Regions
        // },
        // incrementCurrentPage(state) {
        //     if (state.currentPage < Math.ceil(state.maxPage / 7)) state.currentPage = state.currentPage + 1
        // },
        // decrementCurrentPage(state) {
        //     if (state.currentPage > 1) state.currentPage--
        // }
    },
    state: {
        regions: [],
        region: {
            id: "",
            name: "",
        }
        // currentPage: 1,
        // maxPage: 0
    },
    getters: {
        allRegions(state) {
            return state.regions
        },
        getRegion(state) {
            //alert(state.Region.id)
            return state.region
        },
        // getCurrentPage(state) {
        //     return state.currentPage
        // },
    },
}