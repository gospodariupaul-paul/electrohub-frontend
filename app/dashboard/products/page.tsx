export const dynamic = "force-dynamic";

import { getProducts } from "@/lib/products";

export default async function ProductsPage() {
  const products = await getProducts();
  return <div>{/* ... */}</div>;
}
