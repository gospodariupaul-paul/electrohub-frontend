"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CategoryPage({ params }) {
  const { slug } = params;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/category/${slug}`,
        { cache: "no-store" }
      );
      const data = await res.json();
      setProducts(data);
    }

    loadProducts();
  }, [slug]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 capitalize">{slug}</h1>

      {products.length === 0 ? (
        <p>Nu există produse în această categorie.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}   // ← AICI era product.product_id
              className="border p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="w-full h-48 object-cover rounded"
              />

              <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.price} RON</p>

              <Link
                href={`/produs/${product.id}`}   // ← AICI era product.product_id
                className="text-center block bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Detalii produs
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
