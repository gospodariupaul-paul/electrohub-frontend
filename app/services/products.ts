import axios from "@/lib/axios";
import { API } from "@/lib/api";

export async function getProducts() {
  const res = await axios.get(API.products.list);
  return res.data;
}

export async function getProductById(id: string | number) {
  const res = await axios.get(API.products.byId(id));
  return res.data;
}

export async function createProduct(data: any) {
  const res = await axios.post(API.products.create, data);
  return res.data;
}

export async function updateProduct(id: string | number, data: any) {
  const res = await axios.put(API.products.byId(id), data);
  return res.data;
}

export async function deleteProduct(id: string | number) {
  const res = await axios.delete(API.products.byId(id));
  return res.data;
}
