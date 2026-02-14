import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://electrohub-backend-1-10qa.onrender.com/api",
  withCredentials: true,
});

export default axiosInstance;
