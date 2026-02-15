"use client";

import Image from "next/image";
import Link from "next/link";

export default function StartPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">

      {/* HERO SECTION */}
      <section className="relative w-full h-[420px]">
        <Image
          src="/hero.jpg"
          alt="Electronice moderne"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            GOSPO Electro Hub
          </h1>
          <p className="text-lg text-gray-200 mt-3">
            Control tehnic complet într‑un singur loc
          </p>

          <Link
            href="/create-account"
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg transition"
          >
            Creează cont
          </Link>
        </div>
      </section>

      {/* SEARCH BAR */}
      <div className="w-full px-6 mt-6">
        <input
          type="text"
          placeholder="Caută funcții, module sau produse..."
          className="w-full p-3 rounded-xl bg-white border border-gray-300 shadow-sm"
        />
      </div>

      {/* BENTO GRID – FUNCȚIONALITĂȚI */}
      <section className="px-6 mt-10">
        <h2 className="text-2xl font-bold mb-4">Funcționalități principale</h2>

        <div className="grid grid-cols-2 gap-4">

          <Link href="/dashboard" className="p-5 bg-white rounded-2xl shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold">Dashboard</h3>
            <p className="text-gray-600 text-sm mt-1">Panoul tehnic principal.</p>
          </Link>

          <Link href="/products" className="p-5 bg-white rounded-2xl shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold">Products</h3>
            <p className="text-gray-600 text-sm mt-1">Administrează produse.</p>
          </Link>

          <Link href="/settings" className="p-5 bg-white rounded-2xl shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold">Settings</h3>
            <p className="text-gray-600 text-sm mt-1">Setări cont și avatar.</p>
          </Link>

          <Link href="/avatar-upload" className="p-5 bg-white rounded-2xl shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold">Avatar Upload</h3>
            <p className="text-gray-600 text-sm mt-1">Schimbă poza de profil.</p>
          </Link>

          <Link href="/orders" className="p-5 bg-white rounded-2xl shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold">Orders</h3>
            <p className="text-gray-600 text-sm mt-1">Administrare comenzi.</p>
          </Link>

          <Link href="/analytics" className="p-5 bg-white rounded-2xl shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold">Analytics</h3>
            <p className="text-gray-600 text-sm mt-1">Statistici tehnice.</p>
          </Link>

        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="px-6 mt-12 mb-24">
        <h2 className="text-2xl font-bold mb-4">Încredere și siguranță</h2>

        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-gray-700 italic">
            „O platformă tehnică rapidă, intuitivă și extrem de stabilă.”
          </p>
          <p className="text-right text-gray-500 mt-2">— Utilizator verificat</p>
        </div>

        <div className="flex justify-center gap-6 mt-6 opacity-70">
          <span className="text-sm font-semibold">GDPR</span>
          <span className="text-sm font-semibold">ISO‑27001</span>
          <span className="text-sm font-semibold">Secure Cloud</span>
        </div>
      </section>

      {/* BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 shadow-lg py-3 flex justify-around text-gray-700">
        <Link href="/" className="flex flex-col items-center text-sm">
          <i className="fa-solid fa-house text-xl"></i>
          Home
        </Link>

        <Link href="/dashboard" className="flex flex-col items-center text-sm">
          <i className="fa-solid fa-chart-line text-xl"></i>
          Dashboard
        </Link>

        <Link href="/products" className="flex flex-col items-center text-sm">
          <i className="fa-solid fa-box text-xl"></i>
          Produse
        </Link>

        <Link href="/settings" className="flex flex-col items-center text-sm">
          <i className="fa-solid fa-gear text-xl"></i>
          Setări
        </Link>
      </nav>

    </main>
  );
}
