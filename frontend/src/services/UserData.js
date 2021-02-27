import http from "../http-common";

class UserData {
    
  getAll() {
    return http.get("/users");
  }

  getPage(page) {
    return http.get(`/users?page=${page}`);
  }

//   get(id) {
//     return http.get(`/fish/${id}`);
//   }

  create(data) {
    return http.post("/users", data);
  }

  // update(data) {
  //   return http.post(`/users/update`, data);
  // }

  update(id, data) {
    return http.put(`/users/${id}`, data);
  }

  updatePassword(login, data) {
    return http.post(`/users/changepassword?login=${login}`, data);
  }

  delete(id) {
    return http.delete(`/users/${id}`);
  }

//   deleteAll() {
//     return http.delete(`/fish`);
//   }

  getAmount() {
    return http.get(`/users?p=amount`)
  }

  getOne(login) {
    return http.get(`/users/${login}`);
  }

  signIn(data) {
    return http.post(`au/login`, data)
  }
  
}

export default new UserData();