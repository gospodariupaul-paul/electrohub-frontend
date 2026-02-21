import Link from "next/link";
"use client";

import { useState } from "react";

const mockCategories = [
  { id: 1, name: "Telefoane", slug: "telefoane" },
  { id: 2, name: "Laptopuri", slug: "laptopuri" },
  { id: 3, name: "Componente PC", slug: "componente-pc" },
  { id: 4, name: "Drones", slug: "drones" },
  { id: 5, name: "IoT & Smart Home", slug: "smart-home" },
  { id: 6, name: "Audio-Video", slug: "audio-video" },
];

const mockDeals = [
  { id: 1, name: "Laptop UltraTech 15", price: "4999 lei", tag: "Hot Deal" },
  { id: 2, name: "Telefon X Pro 2026", price: "2999 lei", tag: "Nou" },
  { id: 3, name: "Căști Wireless Pro", price: "499 lei", tag: "Best Seller" },
];

const mockAiRecs = [
  { id: 1, name: "Monitor 4K 144Hz", desc: "Perfect pentru setup de gaming" },
  { id: 2, name: "Kit Smart Home", desc: "Control complet al casei tale" },
  { id: 3, name: "Soundbar Dolby Atmos", desc: "Cinematic audio experience" },
];

export default function HomePage() {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Căutare:", search);
  };

  return (
    <div className="min-h-screen bg-[#050712] text-white flex flex-col">
      {/* restul codului tău */}
    </div>
  );
}

      {/* NAVBAR */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* LOGO FUTURIST MĂRIT */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* ICONIȚĂ FUTURISTĂ */}
            <div className="relative">
              <div
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 via-purple-500 to-blue-600
                           flex items-center justify-center shadow-[0_0_25px_rgba(0,255,255,0.5)]
                           group-hover:shadow-[0_0_40px_rgba(0,255,255,0.8)]
                           transition-all duration-300"
              >
                <span className="text-3xl font-extrabold tracking-tight text-black drop-shadow-md">
                  G
                </span>
              </div>

              {/* INEL HOLOGRAFIC ANIMAT */}
              <div className="absolute inset-0 rounded-2xl border border-cyan-400/50 animate-pulse blur-[1px]" />
            </div>

            {/* TEXT LOGO */}
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-2xl tracking-wide group-hover:text-cyan-300 transition">
                GOSPO <span className="text-cyan-400">Electro</span> Hub
              </span>
              <span className="text-[12px] text-white/60">
                Viitorul electronicii, la un click distanță
              </span>
            </div>
          </Link>

          {/* AUTH BUTTONS */}
          <div className="flex items-center gap-3 text-sm">
            <a
              href="/login"
              className="px-4 py-2 rounded-lg border border-white/15 hover:border-cyan-400 hover:text-cyan-300 transition"
            >
              Login
            </Link>
            <a
              href="/register"
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition"
            >
              Create account
            </Link>
            <a
              href="/logout"
              className="hidden sm:inline px-4 py-2 rounded-lg border border-red-500/40 text-red-300 hover:bg-red-500/10 text-xs transition"
            >
              Logout
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
          {/* HERO SECTION */}
          <section className="grid md:grid-cols-[3fr,2fr] gap-8 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-400 mb-3">
                GOSPO ELECTRO HUB
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Viitorul electronicii,{" "}
                <span className="text-cyan-400">la un click distanță.</span>
              </h1>
              <p className="text-sm md:text-base text-white/70 mb-6 max-w-xl">
                Vinde și cumpără tech rapid, cu recomandări inteligente, anunțuri verificate și
                experiență futuristă în dark mode. Tot ce ai nevoie pentru setup-ul tău.
              </p>

              {/* SEARCH BAR */}
              <form
                onSubmit={handleSearch}
                className="flex flex-col sm:flex-row gap-3 mb-5"
              >
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Caută: "laptop i7 32gb 1tb", "dronă 4k sub 500eur"...'
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-400 placeholder:text-white/40"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-white/40">
                    AI Search
                  </span>
                </div>
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm whitespace-nowrap"
                >
                  Caută inteligent
                </button>
              </form>

              {/* CTA BUTTONS */}
              <div className="flex flex-wrap gap-3 text-sm">
                <a
                  href="/dashboard/products/add"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-black font-semibold"
                ></a>