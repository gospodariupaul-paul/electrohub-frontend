"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductsList from "@/components/ProductsList";
import { FiMessageCircle } from "react-icons/fi"; // 🔥 iconiță chat

// 🔥 FIX: dezactivăm prefetch pentru a evita 401 după login
Link.defaultProps = { prefetch: false };

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [isLogged, setIsLogged] = useState(false);

  // 🔥 unread messages
  const [unreadCount, setUnreadCount] = useState(0);

  // 🔥 încarcă numărul de mesaje necitite
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("https://electrohub-backend-1-10qa.onrender.com/conversations/unread", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.count !== undefined) {
          setUnreadCount(data.count);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsLogged(!!token);
    }

    axios
      .get("https://electrohub-backend-1-10qa.onrender.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Eroare la încărcarea produselor:", err));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Căutare:", search);
  };

  return (
    <>
      {/* 🔥 FUNDAL ANIMAT ICONIȚE */}
      <div className="electro-bg">
        {Array.from({ length: 20 }).map((_, i) => (
          <img
            key={i}
            src={`/electro/e${(i % 6) + 1}.svg`}
            className="electro-item"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${6 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* 🌍 GLOB VIDEO FUTURIST */}
      <div className="fixed inset-0 flex justify-center items-center pointer-events-none z-0">
        <video
          src="/earth.mp4"
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          className="earth-video"
        />
      </div>

      {/* 🔥 PAGINA */}
      <div className="min-h-screen bg-[#050712]/70 backdrop-blur-sm text-white flex flex-col px-4 md:px-10 lg:px-20 relative overflow-hidden">

        {/* NAVBAR */}
        <header className="border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-20">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 via-purple-500 to-blue-600 flex items-center justify-center shadow-[0_0_25px_rgba(0,255,255,0.5)] group-hover:shadow-[0_0_40px_rgba(0,255,255,0.8)] transition-all duration-300">
                  <span className="text-3xl font-extrabold tracking-tight text-black drop-shadow-md">
                    G
                  </span>
                </div>
                <div className="absolute inset-0 rounded-2xl border border-cyan-400/50 animate-pulse blur-[1px]" />
              </div>

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
            <div className="flex items-center gap-4 text-sm">

              {/* 🔥 ICONIȚĂ CHAT CU NUMĂR NECITITE */}
              {isLogged && (
                <Link href="/chat" className="relative">
                  <FiMessageCircle size={24} className="text-cyan-300" />

                  {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </Link>
              )}

              {!isLogged && (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-lg border border-white/15 hover:border-cyan-400 hover:text-cyan-300 transition"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition"
                  >
                    Create account
                  </Link>
                </>
              )}

              {isLogged && (
                <Link
                  href="/logout"
                  className="px-4 py-2 rounded-lg border border-red-500/40 text-red-300 hover:bg-red-500/10 text-xs transition"
                >
                  Logout
                </Link>
              )}
            </div>

          </div>
        </header>

        {/* MAIN */}
        <main className="flex-1 relative z-10">
          <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">

            {/* HERO SECTION */}
            <section className="grid md:grid-cols-[3fr,2fr] gap-8 items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-400 mb-3">
                  GOSPO ELECTRO HUB
                </p>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  Viitorul electronicii, <span className="text-cyan-400">la un click distanță.</span>
                </h1>

                <p className="text-sm md:text-base text-white/70 mb-6 max-w-xl">
                  Vinde și cumpără tech rapid, cu recomandări inteligente, anunțuri verificate și experiență futuristă în dark mode.
                </p>

                {/* SEARCH BAR */}
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-5">
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

                  <button type="submit" className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm whitespace-nowrap">
                    Caută inteligent
                  </button>
                </form>

                {/* CTA BUTTONS */}
                <div className="flex flex-wrap gap-3 text-sm">
                  <Link href="/add-product" className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-black font-semibold">
                    Adaugă anunț
                  </Link>
                  <a href="#oferte" className="px-4 py-2.5 rounded-xl border border-white/15 hover:border-cyan-400 text-white/80 hover:text-cyan-300 transition">
                    Explorează oferte
                  </a>
                </div>
              </div>

              {/* HERO VISUAL */}
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none" />
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-4">
                  <p className="text-xs text-white/60">Live Tech Snapshot</p>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-black/40 border border-white/10 rounded-xl p-3">
                      <p className="text-white/60 mb-1">Anunțuri active</p>
                      <p className="text-lg font-semibold text-cyan-400">+124</p>
                    </div>

                    <div className="bg-black/40 border border-white/10 rounded-xl p-3">
                      <p className="text-white/60 mb-1">Utilizatori verificați</p>
                      <p className="text-lg font-semibold text-emerald-400">+58</p>
                    </div>

                    <div className="bg-black/40 border border-white/10 rounded-xl p-3">
                      <p className="text-white/60 mb-1">Licitații live</p>
                      <p className="text-lg font-semibold text-purple-400">7</p>
                    </div>

                    <div className="bg-black/40 border border-white/10 rounded-xl p-3">
                      <p className="text-white/60 mb-1">Scam Protection</p>
                      <p className="text-[11px] text-emerald-300">2FA & Verified Sellers</p>
                    </div>
                  </div>

                  <div className="mt-2 text-[11px] text-white/50">
                    AR & AI ready • Refurbished verified • Secure payments
                  </div>
                </div>
              </div>
            </section>

            {/* CATEGORII */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Categorii principale</h2>
                <span className="text-xs text-white/50">
                  Organizare de tip bento grid, cu focus pe ce te interesează
                </span>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { id: 1, name: "Telefoane", slug: "telefoane" },
                  { id: 2, name: "Laptopuri", slug: "laptopuri" },
                  { id: 3, name: "Componente PC", slug: "componente-pc" },
                  { id: 4, name: "Drones", slug: "drones" },
                  { id: 5, name: "IoT & Smart Home", slug: "smart-home" },
                  { id: 6, name: "Audio-Video", slug: "audio-video" },
                ].map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/categorie/${cat.slug}`}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-cyan-400 hover:bg-white/10 transition flex flex-col justify-between"
                  >
                    <div>
                      <p className="text-sm font-semibold mb-1">{cat.name}</p>
                      <p className="text-[11px] text-white/50">
                        Explorează cele mai noi produse din categoria {cat.name}.
                      </p>
                    </div>

                    <span className="mt-3 text-[11px] text-cyan-300">
                      Vezi produsele →
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {/* HOT DEALS */}
            <section id="oferte" className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Top Tech Hot Deals</h2>
                <span className="text-xs text-white/50">
                  Carusel 3D (placeholder) – poți conecta ulterior la backend
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { id: 1, name: "Laptop UltraTech 15", price: "4999 lei", tag: "Hot Deal" },
                  { id: 2, name: "Telefon X Pro 2026", price: "2999 lei", tag: "Nou" },
                  { id: 3, name: "Căști Wireless Pro", price: "499 lei", tag: "Best Seller" },
                ].map((deal) => (
                  <div
                    key={deal.id}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between"
                  >
                    <div>
                      <p className="text-xs text-cyan-300 mb-1">{deal.tag}</p>
                      <p className="text-sm font-semibold mb-1">{deal.name}</p>
                      <p className="text-sm text-emerald-300">{deal.price}</p>
                    </div>

                    <button className="mt-3 text-xs px-3 py-1.5 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-400">
                      Adaugă în coș
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* AI RECOMMENDATIONS */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Îți recomandăm pentru setup-ul tău (AI)
                </h2>
                <span className="text-xs text-white/50">
                  Bazat pe comportament, istoric și preferințe (placeholder logic)
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { id: 1, name: "Monitor 4K 144Hz", desc: "Perfect pentru setup de gaming" },
                  { id: 2, name: "Kit Smart Home", desc: "Control complet al casei tale" },
                  { id: 3, name: "Soundbar Dolby Atmos", desc: "Cinematic audio experience" },
                ].map((rec) => (
                  <div
                    key={rec.id}
                    className="bg-gradient-to-br from-white/5 to-cyan-500/5 border border-white/10 rounded-xl p-4"
                  >
                    <p className="text-sm font-semibold mb-1">{rec.name}</p>
                    <p className="text-[12px] text-white/60 mb-2">{rec.desc}</p>

                    <button className="text-[11px] px-3 py-1.5 rounded-lg border border-cyan-400 text-cyan-300 hover:bg-cyan-500/10">
                      Vezi detalii
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* PRODUSE REALE */}
            <section className="mt-10">
              <h2 className="text-lg font-semibold mb-4">Produse recente</h2>

              {products.length === 0 ? (
                <p className="text-white/50 text-sm">Nu există produse încă.</p>
              ) : (
                <ProductsList products={products} />
              )}
            </section>

          </div>
        </main>

        {/* FOOTER */}
        <footer className="border-t border-white/10 bg-black/60 mt-8">
          <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-[11px] text-white/50">

            <div className="space-x-3">
              <Link href="/security" className="hover:text-cyan-300">
                Securitate
              </Link>
              <Link href="/warranty" className="hover:text-cyan-300">
                Politica de garanție
              </Link>
              <Link href="/support" className="hover:text-cyan-300">
                Suport Chatbot AI
              </Link>
            </div>

            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-lg border border-white/15 hover:border-white/40">
                Download on App Store
              </button>
              <button className="px-3 py-1.5 rounded-lg border border-white/15 hover:border-white/40">
                Get it on Google Play
              </button>
            </div>

          </div>
        </footer>

      </div>
    </>
  );
}
