export const dynamic = "force-dynamic";

import { getProducts } from "@/app/services/products";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>Products</h1>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {products.map((p: any) => (
          <li
            key={p.id}
            style={{
              background: "#f5f5f5",
              padding: "12px 16px",
              marginBottom: 10,
              borderRadius: 6,
              border: "1px solid #ddd",
              color: "#000", // text clar
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            {p.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
