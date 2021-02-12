import axios from "axios";
axios.defaults.withCredentials = true

export default axios.create({
  baseURL: "http://localhost:3000/api", //для локальной сети попменять на 192.168.0.102
  headers: {
    //"Content-type": "application/json",
    "Content-type": "multipart/form-data",
    "Access-Control-Allow-Origin": "http://localhost:3000/api"
    // withCredentials: true,
  },
  
  
});

