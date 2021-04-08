import http from "../http-common";

class PlanData {
  get() {
    return http.get("/plans");
  }

  create(data) {
    return http.post("/plans", data);
  }

  update(id, data) {
    return http.put(`/plans/${id}`, data);
  }

  delete(id) {
    return http.delete(`/plans/${id}`);
  }
}

export default new PlanData();
