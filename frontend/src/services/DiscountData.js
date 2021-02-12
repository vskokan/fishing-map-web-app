import http from "../http-common";

class DiscountData {
    
  getAll() {
    return http.get("/discounts");
  }

//   get(id) {
//     return http.get(`/fish/${id}`);
//   }

  create(data) {
    return http.post("/discounts", data);
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

  findById(id) {
    return http.get(`/district?id=${id}`);
  }
  
}

export default new DiscountData();