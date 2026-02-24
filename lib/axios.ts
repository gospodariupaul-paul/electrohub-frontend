import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://electrohub-backend.vercel.app", // backend-ul tău
  withCredentials: true,
});

export default axiosInstance;
