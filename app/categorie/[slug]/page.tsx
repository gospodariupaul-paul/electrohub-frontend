"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CategoryPage({ params }) {
  const { slug } = params; // slug = categoryId (1,2,3,4)
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/category/${slug}`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          console.error("API ERROR:", res.status);
          setProducts([]); // prevenim crash-ul
          return;
        }

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("FETCH ERROR:", err);
        setProducts([]); // prevenim crash-ul
      }
    }

    loadProducts();
  }, [slug]);

  return (
    <div className="container mx-auto py-10">

      {/* 🔙 BUTON ÎNAPOI */}
      <button
        onClick={() => router.back()}
        className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black rounded-lg font-semibold transition"
      >
        ← Înapoi
      </button>

      <h1 className="text-3xl font-bold mb-6 capitalize">Categoria {slug}</h1>

      {products.length === 0 ? (
        <p>Nu există produse în această categorie.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
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
                href={`/product/${product.id}`}
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
