import GeoData from "../../services/GeoData";

export default {
  actions: {
    fetchCountries({ commit }) {
      GeoData.readAllCountries().then((json) => {
        const countries = json.data;
        commit("updateCountries", countries);
      });
    },
    createCountry({ commit, dispatch }, newCountry, countries) {
      GeoData.create(newCountry).then(() => {
        dispatch("fetchCountries").then(() => {
          commit("updateCountries", countries);
        });
      });
    },
    fetchRegions({ commit }) {
      GeoData.readAllRegions()
      .then((json) => {
        const regions = json.data;
        commit("updateRegions", regions);
      });
    },
    fetchLocations({ commit }) {
      GeoData.readAllLocations()
      .then((json) => {
        const locations = json.data;
        commit("updateLocations", locations);
      });
    },
    createLocation(location) {
        const data = new FormData()
        data.append('name', location.name)
        data.append('region', location.region)
        // console.log(locationName)
        console.log(data)
        GeoData.createLocation(location)
        .then(() => {
            GeoData.fetchLocationsByRegion(data.region)
        })
    }
  },
  mutations: {
    updateCountries(state, countries) {
      state.countries = countries;
      state.isLoaded = true;
    },
    updateRegions(state, regions) {
      state.regions = regions;
    },
    updateLocations(state, locations) {
      state.locations = locations;
    },
  },
  state: {
    countries: [],
    regions: [],
    locations: [],
    isLoaded: false,
  },
  getters: {
    allCountries(state) {
      return state.countries;
    },
    countriesAreLoaded(state) {
      return state.isLoaded;
    },
    allRegions(state) {
      return state.regions;
    },
    allLocations(state) {
      return state.locations;
    },
    filteredLocation(state, id) {
      state.locations.forEach(location => {
        if (location.locationId == id)
            return location
    })
    }
  },
};
