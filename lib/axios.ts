import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://electrohub-backend-1-10qa.onrender.com",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // 🔥 FIX CRITIC: dacă headers nu există, le creăm
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
