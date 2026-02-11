import axios from "@/lib/axios";
import { API } from "@/lib/api";

export async function getCategories() {
  const res = await axios.get(API.categories.list);
  return res.data;
}

export async function getCategoryById(id: string | number) {
  const res = await axios.get(API.categories.byId(id));
  return res.data;
}

export async function createCategory(data: any) {
  const res = await axios.post(API.categories.create, data);
  return res.data;
}

export async function updateCategory(id: string | number, data: any) {
  const res = await axios.put(API.categories.byId(id), data);
  return res.data;
}

export async function deleteCategory(id: string | number) {
  const res = await axios.delete(API.categories.byId(id));
  return res.data;
}
