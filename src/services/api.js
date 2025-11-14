import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // importante
});

export default api;
