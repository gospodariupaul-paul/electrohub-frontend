"use client";

import Image from "next/image";
import Link from "next/link";

export default function StartPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">

      {/* HERO */}
      <section className="relative w-full h-[350px]">
        <Image
          src="/hero.jpg" // imaginea ta cu electronice moderne
          alt="Electronice moderne"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl font-bold text-white">GOSPO Electro Hub</h1>
          <p className="text-lg text-gray-200 mt-2">
            Control tehnic complet într‑un singur loc
          </p>
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

      {/* LOGIN / CREATE ACCOUNT */}
      <div className="grid grid-cols-2 gap-4 px-6 mt-6">
        <Link href="/login" className="p-4 bg-white rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-xl font-semibold">Login</h3>
          <p className="text-gray-600 text-sm mt-1">Autentificare rapidă.</p>
        </Link>

        <Link href="/create-account" className="p-4 bg-white rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-xl font-semibold">Create Account</h3>
          <p className="text-gray-600 text-sm mt-1">Creează un cont nou.</p>
        </Link>
      </div>

      {/* MODULE */}
      <div className="px-6 mt-10">
        <h2 className="text-2xl font-bold mb-4">Module tehnice</h2>

        <div className="grid grid-cols-2 gap-4">

          <Link href="/dashboard" className="p-4 bg-white rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold">Dashboard</h3>
            <p className="text-gray-600 text-sm mt-1">Panoul tehnic principal.</p>
          </Link>

          <Link href="/products" className="p-4 bg-white rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold">Products</h3>
            <p className="text-gray-600 text-sm mt-1">Încarcă poze și administrează produse.</p>
          </Link>

          <Link href="/settings" className="p-4 bg-white rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold">Settings</h3>
            <p className="text-gray-600 text-sm mt-1">Setări cont și avatar.</p>
          </Link>

          <Link href="/avatar-upload" className="p-4 bg-white rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold">Avatar Upload</h3>
            <p className="text-gray-600 text-sm mt-1">Încarcă sau schimbă poza de profil.</p>
          </Link>

          <Link href="/delete-system" className="p-4 bg-white rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold">Delete System</h3>
            <p className="text-gray-600 text-sm mt-1">Ștergere elemente cu click dreapta.</p>
          </Link>

          <Link href="/orders" className="p-4 bg-white rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold">Orders</h3>
            <p className="text-gray-600 text-sm mt-1">Administrare comenzi.</p>
          </Link>

          <Link href="/analytics" className="p-4 bg-white rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold">Analytics</h3>
            <p className="text-gray-600 text-sm mt-1">Statistici și analiză tehnică.</p>
          </Link>

        </div>
      </div>

    </main>
  );
}
