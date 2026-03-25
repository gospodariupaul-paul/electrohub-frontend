"use client";

import Link from "next/link";

export default function PaymentMethodsPage() {
  return (
    <div className="text-white p-6">

      {/* Înapoi */}
      <Link
        href="/my-account/settings"
        className="inline-block mb-6 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm"
      >
        ← Înapoi la setări
      </Link>

      <h1 className="text-3xl font-bold text-cyan-400 mb-4">
        Metode de plată
      </h1>

      <p className="text-gray-400 mb-8">
        Gestionează cardurile salvate pentru plăți rapide și sigure.
      </p>

      {/* Dacă nu ai încă sistem de carduri */}
      <div className="bg-[#0b1220] p-6 rounded-xl border border-cyan-500/20">
        <p className="text-gray-300">
          Momentan nu ai carduri salvate.
        </p>

        <button
          className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold"
        >
          Adaugă un card nou
        </button>
      </div>
    </div>
  );
}
