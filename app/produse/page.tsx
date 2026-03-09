"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import ProductsList from "@/components/ProductsList";

export default function ProdusePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://electrohub-backend-1-10qa.onrender.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Eroare la încărcarea produselor:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Se încarcă produsele...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b141a] text-white px-4 py-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-2xl font-bold mb-6">Toate produsele active</h1>

        {products.length === 0 ? (
          <p className="text-white/50">Nu există produse active.</p>
        ) : (
          <ProductsList products={products} />
        )}

      </div>
    </div>
  );
}
