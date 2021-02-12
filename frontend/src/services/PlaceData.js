import http from "../http-common";

class PlaceData {
    
  getAll() {
    return http.get("/places");
  }

  getPage(page) {
    return http.get(`/places?page=${page}`);
  }

//   get(id) {
//     return http.get(`/fish/${id}`);
//   }

  create(data) {
    return http.post("/places", data);
  }

  // update(data) {
  //   return http.post(`/Places/update`, data);
  // }

  update(id, data) {
    return http.put(`/places/${id}`, data);
  }

  delete(id) {
    return http.delete(`/places/${id}`);
  }

//   deleteAll() {
//     return http.delete(`/fish`);
//   }

  getAmount() {
    return http.get(`/places?p=amount`)
  }

//   findByTitle(title) {
//     return http.get(`/fish?title=${title}`);
//   }
  
}

export default new PlaceData();