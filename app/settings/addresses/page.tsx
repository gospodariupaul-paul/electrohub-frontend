"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function SavedAddressesPage() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/addresses", { withCredentials: true })
      .then((res) => setAddresses(res.data))
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

      <h1 className="text-2xl font-bold mb-6">Adrese salvate</h1>

      {loading && <p>Se încarcă...</p>}

      {!loading && addresses.length === 0 && (
        <p className="text-gray-400">Nu ai adrese salvate.</p>
      )}

      <div className="grid gap-4 max-w-lg">
        {addresses.map((a) => (
          <div
            key={a.id}
            className="bg-[#111b21] p-4 rounded-lg border border-white/10"
          >
            <p className="font-semibold">{a.name}</p>
            <p className="text-gray-400">{a.address}</p>
            <p className="text-gray-400">{a.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
