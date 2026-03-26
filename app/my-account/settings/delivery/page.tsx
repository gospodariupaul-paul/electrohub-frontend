"use client";

import Link from "next/link";
import { TruckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function DeliverySettings() {
  const [courier, setCourier] = useState("fan");
  const [defaultAddress, setDefaultAddress] = useState("");

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 text-white">

      <Link
        href="/my-account/settings"
        className="inline-block mb-6 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm"
      >
        ← Înapoi la setări
      </Link>

      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <TruckIcon className="w-6 h-6 text-[#00eaff]" />
        Setări livrare
      </h1>

      <p className="text-gray-400 mb-6">
        Curieri preferați și opțiuni implicite de livrare.
      </p>

      <div className="space-y-6">

        {/* Curier preferat */}
        <div>
          <label className="block mb-2 text-gray-300">Curier preferat</label>
          <select
            value={courier}
            onChange={(e) => setCourier(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
          >
            <option value="fan">Fan Courier</option>
            <option value="sameday">Sameday</option>
            <option value="dpd">DPD</option>
            <option value="gls">GLS</option>
          </select>
        </div>

        {/* Adresă implicită */}
        <div>
          <label className="block mb-2 text-gray-300">Adresă implicită</label>
          <input
            type="text"
            placeholder="Ex: Str. Exemplu nr. 10, Iași"
            value={defaultAddress}
            onChange={(e) => setDefaultAddress(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
          />
        </div>

        <button className="px-6 py-2 bg-[#00eaff] text-black rounded hover:bg-[#00c7d1] transition">
          Salvează setările
        </button>
      </div>
    </div>
  );
}
