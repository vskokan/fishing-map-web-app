import http from "../http-common";

class FishData {
    
  getAll() {
    return http.get("/fish");
  }

  getAllByPage(page) {
    return http.get(`/fish/pag/?page=${page}`);
  }

  getPage(page) {
    return http.get(`/fish?page=${page}`);
  }

  getAmount() {
    return http.get(`/fish?p=amount`)
  }

//   get(id) {
//     return http.get(`/fish/${id}`);
//   }

  create(data) {
    return http.post("/fish/", data);
  }

  update(id, data) {
    return http.put(`/fish/${id}`, data);
  }

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

export default new FishData();
