import axios from "@/lib/axios";

export async function getCategories() {
  const res = await axios.get("/categories");
  return res.data;
}
