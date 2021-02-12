import http from "../http-common";

class FullReviewData {
    
  getAll() {
    return http.get("/test/reviews");
  }

//   getPage(page) {
//     return http.get(`/reviews?page=${page}`);
//   }

//   get(id) {
//     return http.get(`/fish/${id}`);
//   }

  create(data) {
    return http.post(`/test/reviews`, data);
  }

  // update(data) {
  //   return http.post(`/Places/update`, data);
  // }

//   update(id, data) {
//     return http.put(`/reviews/${id}`, data);
//   }

//   delete(id) {
//     return http.delete(`/reviews/${id}`);
//   }

//   deleteAll() {
//     return http.delete(`/fish`);
//   }

//   getAmount() {
//     return http.get(`/reviews?p=amount`)
//   }

//   findByTitle(title) {
//     return http.get(`/fish?title=${title}`);
//   }
  
}

export default new FullReviewData();