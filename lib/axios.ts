import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://electrohub-backend-1-10qa.onrender.com",
  // ❌ withCredentials NU trebuie folosit aici
});

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");

  if (!config.headers) {
    config.headers = {};
  }

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
