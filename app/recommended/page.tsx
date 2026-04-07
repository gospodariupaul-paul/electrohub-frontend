"use client";

import ProductsList from "@/components/ProductsList";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function RecommendedPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    if (!API_URL) return;

    axios
      .get(`${API_URL}/products`) // aici poți pune endpoint-ul tău de recomandări
      .then((res) => setProducts(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-white">
      <h1 className="text-2xl font-bold mb-4">Recomandate pentru tine</h1>
      <p className="text-white/60 mb-6">
        Produse alese special pentru tine.
      </p>

      {products.length === 0 ? (
        <p className="text-white/40">Nu există recomandări momentan.</p>
      ) : (
        <ProductsList products={products} />
      )}
    </div>
  );
}
