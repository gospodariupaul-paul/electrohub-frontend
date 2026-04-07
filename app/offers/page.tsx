"use client";

import ProductsList from "@/components/ProductsList";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function OffersPage() {
  const [offers, setOffers] = useState<any[]>([]);

  useEffect(() => {
    if (!API_URL) return;

    axios
      .get(`${API_URL}/products`)
      .then((res) => {
        // 🔥 Afișăm ultimele 6 produse ca noutăți
        const latest = res.data.slice(-6).reverse();
        setOffers(latest);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-white">
      <h1 className="text-2xl font-bold mb-4">Oferte și noutăți</h1>
      <p className="text-white/60 mb-6">
        Promoții active și produse nou adăugate.
      </p>

      {offers.length === 0 ? (
        <p className="text-white/40">Nu există oferte momentan.</p>
      ) : (
        <ProductsList products={offers} />
      )}
    </div>
  );
}
