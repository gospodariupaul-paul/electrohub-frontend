"use client";

import { useEffect, useState } from "react";

const API_BASE = "https://electrohub-backend.vercel.app";

type Product = {
  id: string;
  name: string;
  price: number;
  description?: string;
  inStock?: boolean;
};

type Category = {
  id: string;
  name: string;
  productCount?: number;
};

type User = {
  id: string;
  name?: string;
  email?: string;
  role?: string;
};

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [aiInput, setAiInput] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [pRes, cRes, uRes] = await Promise.all([
          fetch(`${API_BASE}/products`),
          fetch(`${API_BASE}/categories`),
          fetch(`${API_BASE}/users`),
        ]);

        if (pRes.ok) {
          const data = await pRes.json();
          setProducts(data.products || []);
        }
        if (cRes.ok) {
          const data = await cRes.json();
          setCategories(data.categories || []);
        }
        if (uRes.ok) {
          const data = await uRes.json();
          setUsers(data.users || []);
        }
      } catch (e) {
        console.error("Eroare la încărcarea datelor:", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleAiAsk = async () => {
    if (!aiInput.trim()) return;
    // aici ai putea lovi un endpoint AI din backend-ul tău
    setAiResponse(
      "AI-ul tău ar răspunde aici. Poți conecta un endpoint din backend (ex: /ai/analyze)."
    );
  };

  return (
    <div className="min-h-screen bg-[#020312] text-white flex">

      {/* SIDEBAR FUTURISTIC */}
      <aside className="w-64 hidden md:flex flex-col border-r border-cyan-500/30 bg-[#05071a]/80 backdrop-blur-lg">
        <div className="p-6 border-b border-cyan-500/30">
          <div className="h-10 w-10 rounded-full bg-cyan-500 blur-sm mb-2" />
          <div className="text-xl font-extrabold tracking-[0.25em] text-cyan-400 uppercase">
            GOSPO
          </div>
          <div className="text-xs text-white/70 mt-1">
            Electro Hub • AI Control
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 text-sm">
          <a className="block px-3 py-2 rounded-lg bg-cyan-600/20 border border-cyan-500/40 hover:bg-cyan-500/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition">
            Dashboard
          </a>
          <a className="block px-3 py-2 rounded-lg hover:bg-white/5 transition">
            Produse
          </a>
          <a className="block px-3 py-2 rounded-lg hover:bg-white/5 transition">
            Categorii
          </a>
          <a className="block px-3 py-2 rounded-lg hover:bg-white/5 transition">
            Useri
          </a>
          <a href="/" className="block px-3 py-2 rounded-lg hover:bg-white/5 transition">
            Home Page
          </a>
        </nav>

        <div className="p-4 border-t border-cyan-500/30 text-xs text-white/60">
          Neural Core: <span className="text-green-400">Online</span>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6 md:p-10 space-y-10">

        {/* HEADER */}
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
              AI Dashboard
            </h1>
            <p className="text-xs md:text-sm text-white/60">
              GOSPO Electro Hub • Futuristic Neon HUD
            </p>
          </div>
          <a
            href="/"
            className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold transition shadow-[0_0_20px_rgba(34,211,238,0.4)]"
          >
            Home Page
          </a>
        </header>

        {/* SALUT + STATUS */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gradient-to-br from-cyan-900/40 via-transparent to-purple-900/40 border border-cyan-500/40 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 h-32 w-32 bg-cyan-500/30 blur-3xl" />
            <h2 className="text-xl font-semibold mb-2">
              Bună, <span className="text-cyan-400">Paul‑Stelian</span> 👋
            </h2>
            <p className="opacity-80 text-sm md:text-base">
              AI-ul monitorizează produsele, categoriile și utilizatorii pentru a optimiza
              vânzările și siguranța.
            </p>
          </div>

          <div className="bg-[#05071a] border border-purple-500/40 rounded-2xl p-6">
            <p className="text-sm uppercase tracking-wide text-purple-300 mb-1">
              Neural Core Status
            </p>
            <p className="text-3xl font-bold text-green-400">Online</p>
            <p className="text-xs opacity-60 mt-2">
              Ultima sincronizare AI: acum 2 minute.
            </p>
          </div>
        </section>

        {/* ACTIUNI RAPIDE + AI MODULE */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="bg-[#05071a] border border-cyan-500/40 rounded-2xl p-5 hover:border-cyan-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] transition">
            <h3 className="text-lg font-semibold mb-2 text-cyan-300">
              Anunț Inteligent (AI)
            </h3>
            <p className="opacity-70 text-sm mb-3">
              Concept UI: aici poți conecta un endpoint din backend care primește o poză și
              returnează titlu, descriere, categorie și preț.
            </p>
            <button className="text-xs px-3 py-1 rounded bg-cyan-600 hover:bg-cyan-500 transition">
              Încarcă poză (concept)
            </button>
          </div>

          <div className="bg-[#05071a] border border-white/15 rounded-2xl p-5">
            <h3 className="text-lg font-semibold mb-2 text-cyan-300">Smart Search</h3>
            <input
              type="text"
              placeholder="Ex: laptop gaming sub 3000 lei..."
              className="w-full p-3 rounded bg-black/40 border border-white/15 outline-none text-sm"
            />
            <p className="text-xs opacity-50 mt-2">
              Căutare contextuală alimentată de AI (poate fi legată de backend).
            </p>
          </div>

          <div className="bg-[#05071a] border border-emerald-500/40 rounded-2xl p-5">
            <h3 className="text-lg font-semibold mb-2 text-emerald-300">AI Chat / Analiză</h3>
            <textarea
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Întreabă AI-ul despre prețuri, produse, strategii..."
              className="w-full p-2 rounded bg-black/40 border border-white/15 outline-none text-xs mb-2"
              rows={3}
            />
            <button
              onClick={handleAiAsk}
              className="text-xs px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 transition"
            >
              Trimite către AI (concept)
            </button>
            {aiResponse && (
              <p className="text-xs opacity-70 mt-2 border-t border-white/10 pt-2">
                {aiResponse}
              </p>
            )}
          </div>
        </section>

        {/* GRAFICE SIMPLE (HUD STYLE) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#05071a] border border-cyan-500/40 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-cyan-300 mb-2">
              AI Pricing Score
            </h3>
            <div className="h-24 bg-gradient-to-r from-red-500 via-yellow-400 to-green-400 rounded-lg relative overflow-hidden">
              <div className="absolute left-1/3 top-0 bottom-0 w-0.5 bg-white/80" />
            </div>
            <p className="text-xs opacity-70 mt-2">
              Indicator conceptual: unde se află prețurile tale față de piață.
            </p>
          </div>

          <div className="bg-[#05071a] border border-purple-500/40 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-purple-300 mb-2">
              Interes Anunțuri
            </h3>
            <div className="h-24 bg-gradient-to-t from-cyan-500/20 to-purple-500/60 rounded-lg relative">
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-cyan-400/60" />
            </div>
            <p className="text-xs opacity-70 mt-2">
              Concept: bară care poate fi legată de vizualizări / click-uri reale.
            </p>
          </div>

          <div className="bg-[#05071a] border border-emerald-500/40 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-emerald-300 mb-2">
              Prognoză Vânzări
            </h3>
            <div className="h-24 bg-gradient-to-r from-emerald-500/20 to-emerald-400/80 rounded-lg relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/30" />
            </div>
            <p className="text-xs opacity-70 mt-2">
              Concept: timeline estimativ pentru vânzări (poate fi calculat în backend).
            </p>
          </div>
        </section>

        {/* PRODUSE / CATEGORII / USERI */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* PRODUSE */}
          <div className="xl:col-span-2 bg-[#05071a] border border-white/15 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-cyan-300">Produse</h3>
              <a
                href="/dashboard/products/add"
                className="text-xs px-3 py-1 rounded bg-cyan-600 hover:bg-cyan-500 transition"
              >
                + Adaugă produs
              </a>
            </div>

            {loading ? (
              <p className="text-sm opacity-70">Se încarcă produsele...</p>
            ) : products.length === 0 ? (
              <p className="text-sm opacity-70">
                Nu există produse încă. Adaugă primul produs pentru a începe analiza AI.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="bg-[#070a20] border border-white/10 rounded-xl p-4 flex flex-col gap-2 hover:border-cyan-400/60 transition"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{p.name}</h4>
                      <span className="text-sm font-bold text-cyan-300">
                        {p.price} lei
                      </span>
                    </div>
                    <p className="text-xs opacity-70 line-clamp-2">
                      {p.description || "Fără descriere."}
                    </p>
                    <p className="text-xs opacity-60">
                      {p.inStock ? "În stoc" : "Stoc epuizat"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CATEGORII & USERI */}
          <div className="space-y-4">
            {/* CATEGORII */}
            <div className="bg-[#05071a] border border-white/15 rounded-2xl p-5">
              <h3 className="text-lg font-semibold text-cyan-300 mb-3">Categorii</h3>
              {loading ? (
                <p className="text-sm opacity-70">Se încarcă categoriile...</p>
              ) : categories.length === 0 ? (
                <p className="text-sm opacity-70">
                  Nicio categorie definită încă.
                </p>
              ) : (
                <ul className="space-y-2 text-sm">
                  {categories.map((c) => (
                    <li
                      key={c.id}
                      className="flex items-center justify-between border-b border-white/5 pb-1"
                    >
                      <span>{c.name}</span>
                      <span className="text-xs opacity-60">
                        {c.productCount || 0} produse
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* USERI */}
            <div className="bg-[#05071a] border border-white/15 rounded-2xl p-5">
              <h3 className="text-lg font-semibold text-cyan-300 mb-3">Useri</h3>
              {loading ? (
                <p className="text-sm opacity-70">Se încarcă userii...</p>
              ) : users.length === 0 ? (
                <p className="text-sm opacity-70">
                  Niciun utilizator înregistrat încă.
                </p>
              ) : (
                <ul className="space-y-2 text-sm max-h-48 overflow-y-auto">
                  {users.map((u) => (
                    <li
                      key={u.id}
                      className="flex items-center justify-between border-b border-white/5 pb-1"
                    >
                      <span>{u.name || u.email}</span>
                      <span className="text-xs opacity-60">
                        {u.role || "user"}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        {/* SECURITATE */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#05071a] border border-emerald-500/40 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-emerald-300 mb-2">
              Scor Verificare AI
            </h3>
            <div className="text-4xl font-bold text-green-400">92%</div>
            <p className="opacity-70 text-sm mt-2">
              Nivel ridicat de încredere pentru tranzacțiile tale.
            </p>
          </div>

          <div className="bg-[#05071a] border border-red-500/40 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-red-300 mb-2">Alertă Fraudă</h3>
            <p className="opacity-70 text-sm">
              Nicio activitate suspectă detectată în ultimele 24 de ore. AI-ul poate
              scana conversațiile în backend pentru tentative de phishing sau fraudă.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
