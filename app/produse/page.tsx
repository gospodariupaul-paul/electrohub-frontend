"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import ProductsList from "@/components/ProductsList";

export default function ProdusePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://electrohub-backend-1-10qa.onrender.com/products")
      .then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white">
      <h1 className="text-2xl font-bold mb-6">Toate produsele active</h1>

      {products.length === 0 ? (
        <p className="text-white/50">Nu există produse.</p>
      ) : (
        <ProductsList products={products} />
      )}
    </div>
  );
}
