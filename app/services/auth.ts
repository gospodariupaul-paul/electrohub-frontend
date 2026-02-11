import axios from "@/lib/axios";

// LOGIN
export async function login(data: { email: string; password: string }) {
  const response = await axios.post("/auth/login", data);
  return response.data;
}

// USER CURENT (în funcție de token)
export async function getCurrentUser() {
  const response = await axios.get("/auth/me");
  return response.data;
}

// LOGOUT (dacă backend-ul are endpoint)
export async function logout() {
  const response = await axios.post("/auth/logout");
  return response.data;
}

// VERIFICARE TOKEN (opțional, dacă ai endpoint dedicat)
export async function verifyToken() {
  const response = await axios.get("/auth/verify");
  return response.data;
}
