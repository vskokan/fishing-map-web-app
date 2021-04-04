import GeoData from '../../services/GeoData'

export default {
    actions: {
        fetchCountries({
            commit,
        }) {
            GeoData.readAllCountries()
                .then(json => {
                    
                    const countries = json.data
                    commit('updateCountries', countries)
                })
        },
        createCountry({
            commit,
            dispatch
        }, newCountry, countries, ) {
            GeoData.create(newCountry)
                .then(() => {
                    dispatch('fetchCountries')
                        .then(() => {
                            commit('updateCountries', countries)
                        })

                })
        },
        fetchRegions({
            commit,
        }) {
            GeoData.readAllRegions()
           
                .then(json => {
                    const regions = json.data
                    commit('updateRegions', regions)
                })
        },
        fetchLocations({
            commit,
        }) {
            GeoData.readAllLocations()
           
                .then(json => {
                    const locations = json.data
                    commit('updateLocations', locations)
                })
        },
    },
    mutations: {
        updateCountries(state, countries) {
            state.countries = countries
            state.isLoaded = true
        },
        updateRegions(state, regions) {
            state.regions = regions
        },
        updateLocations(state, locations) {
            state.locations = locations
        },
    },
    state: {
        countries: [],
        regions: [],
        locations: [],
        isLoaded: false
    },
    getters: {
        allCountries(state) {
            return state.countries
        },
        countriesAreLoaded(state) {
            return state.isLoaded
        },
        allRegions(state) {
            return state.regions
        },
        allLocations(state) {
            return state.locations
        }
    },
}