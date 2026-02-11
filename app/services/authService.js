import { api } from "./api";

export const authService = {
  async login(email, password) {
    return api.post("/auth/login", { email, password }).then(res => res.data);
  },
};
