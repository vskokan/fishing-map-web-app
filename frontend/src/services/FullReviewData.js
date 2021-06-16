import http from "../http-common";

class FullReviewData {
    
  getAll() {
    return http.get("/test/reviews");
  }

  create(data) {
    return http.post(`/test/reviews`, data);
  }

}

export default new FullReviewData();