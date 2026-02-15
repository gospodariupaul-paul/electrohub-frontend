export const dynamic = "force-dynamic";

import { getProducts } from "@/app/services/products";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Produse</h1>

      <ul className="space-y-2">
        {products.map((p: any) => (
          <li key={p.id} className="p-3 bg-gray-100 rounded">
            {p.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
