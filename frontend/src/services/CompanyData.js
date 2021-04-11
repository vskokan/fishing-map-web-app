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

  getDepartments(id) {
    return http.get(`company/${id}/departments`)
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

    sendMail(data) {
      return http.post("/company/partnership", data)
    }
  
}

export default new CompanyData();