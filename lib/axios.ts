import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api", // FOARTE IMPORTANT — folosește API-ul Next.js
  withCredentials: true,
});

export default axiosInstance;
