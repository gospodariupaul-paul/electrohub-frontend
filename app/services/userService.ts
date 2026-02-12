import axios from "@/lib/axios";

export async function getUser() {
  const res = await axios.get("/users/me");
  return res.data;
}
