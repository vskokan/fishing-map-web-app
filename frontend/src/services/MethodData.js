import http from "../http-common";

class MethodData {
    
  getAll() {
    return http.get("/methods");
  }

  getPage(page) {
    return http.get(`/methods?page=${page}`);
  }

//   get(id) {
//     return http.get(`/fish/${id}`);
//   }

  create(data) {
    return http.post("/methods", data);
  }

  update(data) {
    return http.post(`/methods/update`, data);
  }

  delete(id) {
    return http.delete(`/methods/${id}`);
  }

//   deleteAll() {
//     return http.delete(`/fish`);
//   }

  getAmount() {
    return http.get(`/methods?p=amount`)
  }

//   findByTitle(title) {
//     return http.get(`/fish?title=${title}`);
//   }
  
}

export default new MethodData();