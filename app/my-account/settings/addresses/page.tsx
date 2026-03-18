"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function SavedAddressesPage() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FORMULAR — state pentru adresa nouă
  const [newAddress, setNewAddress] = useState({
    name: "",
    address: "",
    city: "",
  });

  // 🔥 FUNCȚIE — trimite adresa la backend
  const addAddress = async () => {
    await axiosInstance.post("/addresses", newAddress, { withCredentials: true });

    // Resetăm formularul
    setNewAddress({ name: "", address: "", city: "" });

    // Reîncărcăm lista
    const res = await axiosInstance.get("/addresses", { withCredentials: true });
    setAddresses(res.data);
  };

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

      {/* 🔥 FORMULAR DE ADAUGARE ADRESA */}
      <div className="bg-[#111b21] p-4 rounded-lg border border-white/10 max-w-lg mt-6">
        <h2 className="font-semibold mb-3">Adaugă o adresă</h2>

        <input
          className="w-full mb-2 p-2 rounded bg-[#0b141a] border border-white/20"
          placeholder="Nume adresă (ex: Acasă)"
          value={newAddress.name}
          onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
        />

        <input
          className="w-full mb-2 p-2 rounded bg-[#0b141a] border border-white/20"
          placeholder="Adresă"
          value={newAddress.address}
          onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
        />

        <input
          className="w-full mb-2 p-2 rounded bg-[#0b141a] border border-white/20"
          placeholder="Oraș"
          value={newAddress.city}
          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
        />

        <button
          onClick={addAddress}
          className="px-4 py-2 bg-green-500 text-black rounded hover:bg-green-600 transition"
        >
          Salvează adresa
        </button>
      </div>
    </div>
  );
}
