"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

// 🔥 Funcția addToCart trebuie să fie ÎNAINTE de componentă și ÎNCHISĂ corect
const addToCart = (product) => {
  if (!product || !product.id) return;

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.images,
      stock: product.stock,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  return cart;
}; // 🔥 AICI LIPSEA ACOLADA ȘI PUNCTUL ȘI VIRGULA

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
              key={product.id}
              className="border p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover rounded"
              />

              <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.price} RON</p>

              <div className="flex flex-col gap-3">
                {/* Detalii produs */}
                <Link
                  href={`/produs/${product.id}`}
                  className="text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Detalii produs
                </Link>

                {/* Adaugă la coș */}
                <button
                  onClick={() => addToCart(product)}
                  className="flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                  <FaShoppingCart />
                  Adaugă la coș
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
