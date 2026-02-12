import { api } from "./api";

export const authService = {
  async login(email, password) {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    // Setăm cookie-urile pentru Vercel (HTTPS)
    document.cookie = `token=${res.data.access_token}; Path=/; Secure; SameSite=None`;
    document.cookie = `refresh_token=${res.data.refresh_token}; Path=/; Secure; SameSite=None`;

    return res.data;
  },

  async logout() {
    document.cookie =
      "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=None";
    document.cookie =
      "refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=None";
  },

  async getProfile() {
    const res = await api.get("/auth/profile");
    return res.data;
  },
};
