import axios from "axios";

export const api = axios.create({
  baseURL: "https://electrohub-backend-1-10qa.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor pentru a atașa token-ul din cookie
api.interceptors.request.use((config) => {
  if (typeof document !== "undefined") {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

// Interceptor pentru refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        const refreshToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("refresh_token="))
          ?.split("=")[1];

        const res = await axios.post(
          "https://electrohub-backend-1-10qa.onrender.com/auth/refresh",
          { refresh_token: refreshToken }
        );

        const newAccess = res.data.access_token;

        // salvăm noul token în cookie
        document.cookie = `token=${newAccess}; path=/; SameSite=Lax;`;

        original.headers.Authorization = `Bearer ${newAccess}`;
        return api(original);
      } catch (err) {
        console.error("Refresh token failed:", err);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
