import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor pentru erori
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Dacă tokenul a expirat, încearcă refresh
    if (error.response?.status === 401) {
      try {
        await api.get("/auth/refresh");
        return api(error.config); // retrimite requestul original
      } catch (refreshError) {
        console.error("Refresh failed");
      }
    }

    return Promise.reject(error);
  }
);
