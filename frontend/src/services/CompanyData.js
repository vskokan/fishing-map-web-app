import http from "../http-common";

class CompanyData {
    
  readAll() {
    return http.get("/company");
  }

//   get(id) {
//     return http.get(`/fish/${id}`);
//   }

  create(data) {
    return http.post("/company", data);
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

export default new CompanyData();