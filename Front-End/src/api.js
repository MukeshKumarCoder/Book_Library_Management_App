import axios from "axios";

const api = axios.create({
  baseURL: "https://book-library-management-back-end.onrender.com/api",
  withCredentials: true,
});

export default api;
