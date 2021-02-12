import http from "../http-common";

class RegionData {
    
  getAll() {
    return http.get("/districts");
  }

  getPage(page) {
    return http.get(`/districts?page=${page}`);
  }

  get(id) {
    return http.get(`/districts/${id}`);
  }
  // findById(id) {
  //   return http.get(`/district?id=${id}`);
  // }

  create(data) {
    return http.post("/districts", data);
  }

  // update(data) {
  //   return http.post(`/districts/update`, data);
  // }

  update(id, data) {
    return http.put(`/districts/${id}`, data);
  }

  delete(id) {
    return http.delete(`/districts/${id}`);
  }

//   deleteAll() {
//     return http.delete(`/fish`);
//   }

  getAmount() {
    return http.get(`/districts?p=amount`)
  }

//   findByTitle(title) {
//     return http.get(`/fish?title=${title}`);
//   }
  
}

export default new RegionData();