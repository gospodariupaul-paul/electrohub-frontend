import axios from "axios";

export const api = axios.create({
  baseURL: "https://electrohub-backend-1-10qa.onrender.com",
  withCredentials: false,
});
