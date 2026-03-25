"use client";

import { useState } from "react";
import Link from "next/link";

export default function PaymentMethodsPage() {
  const [showAddCard, setShowAddCard] = useState(false);

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

      {/* CONTAINER CARDURI */}
      <div className="bg-[#0b1220] p-6 rounded-xl border border-cyan-500/20">
        <p className="text-gray-300">
          Momentan nu ai carduri salvate.
        </p>

        <button
          onClick={() => setShowAddCard(true)}
          className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold"
        >
          Adaugă un card nou
        </button>
      </div>

      {/* 🔥 CONTAINER ADD CARD */}
      {showAddCard && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0f1a2a] p-6 rounded-xl border border-cyan-500/30 w-full max-w-md shadow-xl">

            <h2 className="text-2xl font-semibold text-cyan-400 mb-4">
              Adaugă un card nou
            </h2>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Numele de pe card"
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
              />

              <input
                type="text"
                placeholder="Numărul cardului"
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
              />

              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-1/2 p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="w-1/2 p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                />
              </div>

              <button
                type="button"
                className="w-full px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold"
              >
                Salvează cardul
              </button>
            </form>

            <button
              onClick={() => setShowAddCard(false)}
              className="mt-4 w-full px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg font-semibold"
            >
              Închide
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
