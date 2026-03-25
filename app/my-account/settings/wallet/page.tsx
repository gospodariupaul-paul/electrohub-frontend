"use client";

import { useState } from "react";
import Link from "next/link";

export default function WalletPage() {
  const [showTopUp, setShowTopUp] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

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
        Portofelul meu
      </h1>

      <p className="text-gray-400 mb-8">
        Aici poți vedea soldul tău, tranzacțiile și opțiunile de alimentare.
      </p>

      {/* CARD SOLD */}
      <div className="bg-[#0b1220] p-6 rounded-xl border border-cyan-500/20 mb-8">
        <h2 className="text-xl font-semibold text-cyan-300 mb-2">
          Sold curent
        </h2>
        <p className="text-3xl font-bold text-white">0.00 RON</p>
        <p className="text-gray-400 text-sm mt-1">Nu ai fonduri în portofel.</p>

        <button
          onClick={() => setShowTopUp(true)}
          className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold"
        >
          Alimentează portofelul
        </button>
      </div>

      {/* TRANZACȚII */}
      <div className="bg-[#0f1a2a] p-6 rounded-xl border border-white/10">
        <h2 className="text-xl font-semibold text-white mb-4">
          Istoric tranzacții
        </h2>

        <p className="text-gray-400">
          Nu există tranzacții în portofelul tău.
        </p>
      </div>

      {/* 🔥 MODAL 1 — TOP-UP */}
      {showTopUp && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0f1a2a] p-6 rounded-xl border border-cyan-500/30 w-full max-w-md shadow-xl">

            <h2 className="text-2xl font-semibold text-cyan-400 mb-4">
              Alimentează portofelul
            </h2>

            <form className="space-y-4">
              <input
                type="number"
                placeholder="Sumă (RON)"
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
              />

              <select
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
              >
                <option value="">Selectează metoda de plată</option>
                <option>Card bancar</option>
                <option>PayPal</option>
                <option>Stripe</option>
              </select>

              <button
                type="button"
                onClick={() => {
                  setShowTopUp(false);
                  setShowPayment(true);
                }}
                className="w-full px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold"
              >
                Continuă plata
              </button>
            </form>

            <button
              onClick={() => setShowTopUp(false)}
              className="mt-4 w-full px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg font-semibold"
            >
              Închide
            </button>
          </div>
        </div>
      )}

      {/* 🔥 MODAL 2 — CONTINUĂ PLATA */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0f1a2a] p-6 rounded-xl border border-cyan-500/30 w-full max-w-md shadow-xl">

            <h2 className="text-2xl font-semibold text-cyan-400 mb-4">
              Finalizează plata
            </h2>

            <p className="text-gray-300 mb-4">
              Introdu detaliile cardului pentru a finaliza alimentarea portofelului.
            </p>

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
                className="w-full px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-semibold"
              >
                Plătește acum
              </button>
            </form>

            <button
              onClick={() => setShowPayment(false)}
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
