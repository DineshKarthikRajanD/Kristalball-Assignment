import axios from "axios";

const api = axios.create({
  baseURL: "https://kristalball-assignment-28bc.onrender.com/api",
});

export default api;
