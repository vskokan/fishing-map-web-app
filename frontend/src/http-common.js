import axios from "axios";
axios.defaults.withCredentials = true;

export default axios.create({
  baseURL: "http://localhost:3000/api", // 192.168.0.102
  headers: {
    "Content-type": "multipart/form-data",
    "Access-Control-Allow-Origin": "http://localhost:3000/api",
  },
});
