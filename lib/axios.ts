import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  config.withCredentials = true;

  if (!config.headers) {
    config.headers = {};
  }

  delete config.headers["Authorization"];

  return config;
});

export default axiosInstance;
