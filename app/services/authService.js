import { api } from "./api";

export const authService = {
  async login(email, password) {
    const res = await api.post("/auth/login", {
      email,
      password,
    });
    return res.data;
  },

  async refresh(refreshToken) {
    const res = await api.post("/auth/refresh", {
      refresh_token: refreshToken,
    });
    return res.data;
  },

  async logout(refreshToken) {
    const res = await api.post("/auth/logout", {
      refresh_token: refreshToken,
    });
    return res.data;
  },
};
