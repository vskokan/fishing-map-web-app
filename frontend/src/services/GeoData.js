import http from "../http-common";

class GeoData {
    
  readAllCountries() {
    return http.get("/geo/countries");
  }

  readAllRegions() {
    return http.get("/geo/regions");
  }

  fetchRegionsByCountry(countryId) {
      return http.get(`/geo/regions?country=${countryId}`)
  }

  readAllLocations() {
    return http.get("/geo/locations");
  }

//   get(id) {
//     return http.get(`/fish/${id}`);
//   }

  createCountry(data) {
    return http.post("/geo/countries", data);
  }

  createRegion(data) {
    return http.post("/geo/regions", data);
  }

  updateRegion(id, data) {
    return http.put(`/geo/regions/${id}`, data)
}

  createLocation(data) {
    return http.post("/geo/locations", data);
  }

  fetchLocationsByRegion(regionId) {
    return http.get(`/geo/locations?region=${regionId}`)
}

deleteLocation(id) {
    return http.delete(`/geo/locations/${id}`)
}

updateLocation(id, data) {
    return http.put(`/geo/locations/${id}`, data)
}
//   update(id, data) {
//     return http.put(`/fish/${id}`, data);
//   }

//   delete(id) {
//     return http.delete(`/fish/${id}`);
//   }

//   deleteAll() {
//     return http.delete(`/fish`);
//   }

//   findByTitle(title) {
//     return http.get(`/fish?title=${title}`);
//   }
  
}

export default new GeoData();