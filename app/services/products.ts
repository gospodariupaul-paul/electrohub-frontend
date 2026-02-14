"use server";

import axios from "@/lib/axios";

export async function getProducts() {
  const res = await axios.get("/products");
  return res.data;
}
