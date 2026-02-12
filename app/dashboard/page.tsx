import { getCategories } from "@/app/services/categories";
import { getProducts } from "@/app/services/products";

export default async function DashboardPage() {
  const categories = await getCategories();
  const products = await getProducts();

  return (
    <div>
      <h1>Dashboard</h1>

      <h2>Categories</h2>
      <pre>{JSON.stringify(categories, null, 2)}</pre>

      <h2>Products</h2>
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  );
}
