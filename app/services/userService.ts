import axios from "@/lib/axios";

export async function login(data: { email: string; password: string }) {
  const res = await axios.post("/auth/login", data);
  return res.data;
}

export async function register(data: { name: string; email: string; password: string }) {
  const res = await axios.post("/auth/register", data);
  return res.data;
}

export async function logout() {
  const res = await axios.post("/auth/logout");
  return res.data;
}

export async function refresh() {
  const res = await axios.post("/auth/refresh");
  return res.data;
}
