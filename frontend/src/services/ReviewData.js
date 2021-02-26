//import { get } from "core-js/fn/dict";
import http from "../http-common";

class ReviewData {
    
  getAll() {
    return http.get('/reviews')
  }

  getOne(id) {
    return http.get(`/reviews/${id}`)
  }
  // getAll() {
  //   return http.get("/test/reviews");
  // }

  // getPage(page) {
  //   return http.get(`/reviews?page=${page}`);
  // }

  // create(data) {
  //   return http.post("/reviews", data);
  // }



  // update(id, data) {
  //   return http.put(`/reviews/${id}`, data);
  // }

  delete(id) {
    return http.delete(`/reviews/${id}`);
  }

  // getAmount() {
  //   return http.get(`/reviews?p=amount`)
  // }

  getPhotos(id) {
    return http.get(`/reviews/${id}/photos`)
  }

  getOptions() {
    return http.get('/reviews/options')
  }




}

export default new ReviewData();