"use server";

import axios from "@/lib/axios";

export async function getCategories() {
  const res = await axios.get("/categories");
  return res.data;
}

export async function getCategory(id: string) {
  const res = await axios.get(`/categories/${id}`);
  return res.data;
}

export async function createCategory(data: { name: string }) {
  const res = await axios.post("/categories", data);
  return res.data;
}

export async function updateCategory(id: string, data: { name: string }) {
  const res = await axios.put(`/categories/${id}`, data);
  return res.data;
}

export async function deleteCategory(id: string) {
  const res = await axios.delete(`/categories/${id}`);
  return res.data;
}
