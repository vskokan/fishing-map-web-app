import http from "../http-common";

class FactData {
    
  getAll() {
    return http.get("/facts");
  }

  getAllByPage(page) {
    return http.get(`/facts/pag/?page=${page}`);
  }

  getPage(page) {
    return http.get(`/facts?page=${page}`);
  }

  getAmount() {
    return http.get(`/facts?p=amount`)
  }
//   get(id) {
//     return http.get(`/fact/${id}`);
//   }

  create(data) {
    return http.post("/facts", data);
  }

  update(id, data) {
    return http.put(`/facts/${id}`, data);
  }

  delete(id) {
    return http.delete(`/facts/${id}`);
  }

//   deleteAll() {
//     return http.delete(`/fact`);
//   }

  findByReview(review) {
    return http.get(`/facts?review=${review}`);
  }
  
}

export default new FactData();