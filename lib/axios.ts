import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://electrohub-backend-1-10qa.onrender.com",
  withCredentials: true, // 🔥 OBLIGATORIU
});

axiosInstance.interceptors.request.use((config) => {
  config.withCredentials = true; // 🔥 OBLIGATORIU

  const token = localStorage.getItem("token");

  if (!config.headers) {
    config.headers = {};
  }

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete config.headers["Authorization"];
  }

  return config;
});

export default axiosInstance;
