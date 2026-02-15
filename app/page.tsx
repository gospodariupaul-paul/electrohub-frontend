"use client";

import Link from "next/link";
import { useState } from "react";

export default function StartPage() {
  const [search, setSearch] = useState("");

  return (
    <main className="min-h-screen bg-white text-gray-900 flex flex-col">

      {/* HEADER – LOGO + PROFIL */}
      <header className="w-full flex items-center justify-between p-6 border-b border-gray-300">
        <h1 className="text-2xl font-extrabold tracking-tight">
          GOSPO Electro Hub
        </h1>

        <Link
          href="/dashboard/settings"
          className="w-10 h-10 rounded-full bg-gray-200 border border-gray-400 flex items-center justify-center hover:bg-gray-300 transition"
        >
          <span className="text-sm font-semibold">ME</span>
        </Link>
      </header>

      {/* HERO SECTION */}
      <section className="p-6">
        <h2 className="text-3xl font-bold mb-2">
          Control tehnic complet într‑un singur loc
        </h2>

        <p className="text-sm opacity-70 max-w-xl mb-6">
          Administrează produse, avatar, setări, comenzi, statistici și module tehnice
          dintr‑un panou centralizat, rapid și intuitiv.
        </p>

        {/* HERO IMAGE CU ELECTRONICE */}
        <div className="w-full h-56 md:h-72 bg-gray-200 border border-gray-300 rounded-xl overflow-hidden shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200"
            alt="Electronice moderne"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* SEARCH BAR */}
      <div className="px-6 mb-6">
        <input
          type="text"
          placeholder="Caută funcții, module sau produse..."
          className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* BENTO GRID – TOATE MODULELE */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-24">

        <Link href="/login" className="p-6 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 transition shadow-sm">
          <h3 className="text-lg font-semibold mb-1">Login</h3>
          <p className="text-xs opacity-70">Autentificare rapidă.</p>
        </Link>

        <Link href="/register" className="p-6 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 transition shadow-sm">
          <h3 className="text-lg font-semibold mb-1">Create Account</h3>
          <p className="text-xs opacity-70">Creează un cont nou.</p>
        </Link>

        <Link href="/dashboard" className="p-6 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 transition shadow-sm">
          <h3 className="text-lg font-semibold mb-1">Dashboard</h3>
          <p className="text-xs opacity-70">Panoul tehnic principal.</p>
        </Link>

        <Link href="/dashboard/products" className="p-6 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 transition shadow-sm">
          <h3 className="text-lg font-semibold mb-1">Products</h3>
          <p className="text-xs opacity-70">Încarcă poze și administrează produse.</p>
        </Link>

        <Link href="/dashboard/settings" className="p-6 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 transition shadow-sm">
          <h3 className="text-lg font-semibold mb-1">Settings</h3>
          <p className="text-xs opacity-70">Setări cont și avatar.</p>
        </Link>

        <Link href="/dashboard/settings" className="p-6 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 transition shadow-sm">
          <h3 className="text-lg font-semibold mb-1">Avatar Upload</h3>
          <p className="text-xs opacity-70">Încarcă sau schimbă poza de profil.</p>
        </Link>

        <Link href="/dashboard" className="p-6 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 transition shadow-sm">
          <h3 className="text-lg font-semibold mb-1">Delete System</h3>
          <p className="text-xs opacity-70">Ștergere elemente cu click dreapta.</p>
        </Link>

        <Link href="/dashboard/orders" className="p-6 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 transition shadow-sm">
          <h3 className="text-lg font-semibold mb-1">Orders</h3>
          <p className="text-xs opacity-70">Administrare comenzi.</p>
        </Link>

        <Link href="/dashboard/analytics" className="p-6 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 transition shadow-sm">
          <h3 className="text-lg font-semibold mb-1">Analytics</h3>
          <p className="text-xs opacity-70">Statistici și analiză tehnică.</p>
        </Link>

      </section>

      {/* BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 w-full bg-gray-100 border-t border-gray-300 p-3 flex justify-around text-xs font-medium">
        <Link href="/dashboard" className="hover:text-black opacity-70">Dashboard</Link>
        <Link href="/dashboard/products" className="hover:text-black opacity-70">Products</Link>
        <Link href="/dashboard/settings" className="hover:text-black opacity-70">Settings</Link>
      </nav>

    </main>
  );
}
