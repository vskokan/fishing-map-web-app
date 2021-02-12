import http from "../http-common";

class BaitData {
    
  getAll() {
    return http.get("/baits");
  }

  getPage(page) {
    return http.get(`/baits?page=${page}`);
  }

//   get(id) {
//     return http.get(`/fish/${id}`);
//   }

  create(data) {
    return http.post("/baits", data);
  }

  update(data) {
    return http.post(`/baits/update`, data);
  }

  delete(id) {
    return http.delete(`/baits/${id}`);
  }

//   deleteAll() {
//     return http.delete(`/fish`);
//   }

  getAmount() {
    return http.get(`/baits?p=amount`)
  }

//   findByTitle(title) {
//     return http.get(`/fish?title=${title}`);
//   }
  
}

export default new BaitData();