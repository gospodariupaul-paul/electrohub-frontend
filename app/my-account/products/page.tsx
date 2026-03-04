"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";

export default function MyProductsPage() {
  const { user, loading } = useUser();
  const [products, setProducts] = useState([]);

  // 🔥 Slider index pentru fiecare produs
  const [indexes, setIndexes] = useState<{ [key: number]: number }>({});

  const next = (id: number, images: string[]) => {
    setIndexes((prev) => ({
      ...prev,
      [id]: prev[id] === images.length - 1 ? 0 : (prev[id] || 0) + 1,
    }));
  };

  const prev = (id: number, images: string[]) => {
    setIndexes((prev) => ({
      ...prev,
      [id]: prev[id] === 0 ? images.length - 1 : (prev[id] || 0) - 1,
    }));
  };

  useEffect(() => {
    if (!user) return;

    async function fetchProducts() {
      try {
        const res = await fetch(
          `https://electrohub-backend.vercel.app/products/user/${user.id}`
        );

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Eroare la fetch produse:", err);
      }
    }

    fetchProducts();
  }, [user]);

  if (loading) {
    return <div className="p-6 text-white">Se încarcă...</div>;
  }

  if (!user) {
    return (
      <div className="p-6 text-white">
        <h1 className="text-xl font-bold">Trebuie să fii logat</h1>
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Anunțurile mele</h1>

      {products.length === 0 ? (
        <p className="text-gray-300">Nu ai anunțuri active.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product: any) => {
            const images = product.images || [];
            const index = indexes[product.id] || 0;

            return (
              <div key={product.id} className="bg-gray-800 p-4 rounded-lg">

                {/* 🔥 SLIDER IMAGINI */}
                <div className="relative w-full mb-3">
                  <img
                    src={images[index] || "/placeholder.png"}
                    className="w-full h-56 object-cover rounded-lg"
                  />

                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => prev(product.id, images)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded"
                      >
                        ‹
                      </button>

                      <button
                        onClick={() => next(product.id, images)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded"
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>

                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="text-gray-300">{product.description}</p>
                <p className="text-green-400 font-bold mt-2">{product.price} RON</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
