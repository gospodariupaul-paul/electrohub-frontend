import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://electrohub-backend-1-10qa.onrender.com",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  config.withCredentials = true;

  // backend-ul tău folosește cookie-uri, nu token în localStorage
  if (!config.headers) {
    config.headers = {};
  }

  delete config.headers["Authorization"];

  return config;
});

export default axiosInstance;
