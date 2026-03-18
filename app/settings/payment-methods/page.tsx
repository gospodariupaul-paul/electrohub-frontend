"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function PaymentMethodsPage() {
  const router = useRouter();
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/payments/cards", { withCredentials: true })
      .then((res) => setCards(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#0b141a] text-white p-6">
      <button
        onClick={() => router.push("/my-account/settings")}
        className="mb-6 px-4 py-2 bg-[#00aaff] text-black rounded-lg font-semibold hover:bg-[#008fcc]"
      >
        ← Înapoi la setări
      </button>

      <h1 className="text-2xl font-bold mb-6">Metode de plată</h1>

      {loading && <p>Se încarcă...</p>}

      {!loading && cards.length === 0 && (
        <p className="text-gray-400">Nu ai carduri salvate.</p>
      )}

      <div className="grid gap-4 max-w-lg">
        {cards.map((c) => (
          <div
            key={c.id}
            className="bg-[#111b21] p-4 rounded-lg border border-white/10"
          >
            <p className="font-semibold">Card •••• {c.last4}</p>
            <p className="text-gray-400">Expiră: {c.expiry}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
