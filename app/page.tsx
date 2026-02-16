"use client";

import Image from "next/image";
import Link from "next/link";

export default function StartPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">

      {/* TITLU + DESCRIERE */}
      <section className="px-6 pt-6 pb-4">
        <h1 className="text-3xl font-bold">GOSPO Electro Hub</h1>
        <p className="text-gray-700 mt-2">
          Control tehnic complet într-un singur loc
        </p>
        <p className="text-gray-600 mt-2 text-sm">
          Administrează produse, avatar, setări, comenzi, statistici și module tehnice
          dintr-un panou centralizat, rapid și intuitiv.
        </p>
      </section>

      {/* IMAGINE HERO — FĂRĂ ABSOLUTE, FĂRĂ OVERLAY */}
      <section className="w-full h-[260px]">
        <Image
          src="/hero.jpg"
          alt="Electronice moderne"
          width={1200}
          height={600}
          className="w-full h-full object-cover rounded-none"
        />
      </section>

      {/* SEARCH BAR */}
      <section className="px-6 mt-6">
        <input
          type="text"
          placeholder="Caută funcții, module sau produse..."
          className="w-full p-3 rounded-xl bg-white border border-gray-300 shadow-sm text-sm"
        />
      </section>

      {/* CARDURI */}
      <section className="px-6 mt-8 pb-10 space-y-4">

        {/* LOGIN + CREATE ACCOUNT */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/login" className="block p-4 bg-white rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold">Login</h3>
            <p className="text-gray-600 text-sm mt-1">Autentificare rapidă.</p>
          </Link>

          <Link href="/create-account" className="block p-4 bg-white rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold">Create Account</h3>
            <p className="text-gray-600 text-sm mt-1">Creează un cont nou.</p>
          </Link>
        </div>

        {/* MODULE */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/dashboard" className="block p-4 bg-white rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold">Dashboard</h3>
            <p className="text-gray-600 text-sm mt-1">Panoul tehnic principal.</p>
          </Link>

          <Link href="/products" className="block p-4 bg-white rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold">Products</h3>
            <p className="text-gray-600 text-sm mt-1">Încarcă poze și administrează produse.</p>
          </Link>

          <Link href="/settings" className="block p-4 bg-white rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold">Settings</h3>
            <p className="text-gray-600 text-sm mt-1">Setări cont și avatar.</p>
          </Link>

          <Link href="/avatar-upload" className="block p-4 bg-white rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold">Avatar Upload</h3>
            <p className="text-gray-600 text-sm mt-1">Încarcă sau schimbă poza de profil.</p>
          </Link>
        </div>

      </section>
    </main>
  );
}
