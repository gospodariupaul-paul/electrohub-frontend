"use client";

import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#05070d] text-white flex flex-col">

      {/* HEADER */}
      <header className="w-full flex justify-between items-center px-8 py-6 absolute top-0 left-0 z-20">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          GOSPO Electro Hub
        </h1>

        <div className="flex gap-4">
          <a
            href="/login"
            className="px-5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 transition font-semibold"
          >
            Login
          </a>
          <a
            href="/register"
            className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 transition font-semibold"
          >
            Create Account
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-32 flex-1">

        {/* BACKGROUND IMAGE — aici pui fotografia ta */}
        <Image
          src="/hero-electronics.jpg" // pune aici imaginea ta
          alt="Electronics Hero"
          fill
          className="object-cover opacity-30"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90" />

        {/* HERO CONTENT */}
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-xl">
            Control complet asupra electronicelor tale
          </h2>

          <p className="text-lg md:text-xl text-gray-300 mb-10">
            GOSPO Electro Hub îți oferă o platformă inteligentă pentru gestionarea
            produselor, utilizatorilor și categoriilor — rapid, sigur și intuitiv.
          </p>

          {/* CTA */}
          <a
            href="/register"
            className="px-8 py-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 transition font-bold text-lg shadow-lg"
          >
            Înregistrează-te Gratuit
          </a>
        </div>
      </section>

      {/* NAVIGARE RAPIDĂ */}
      <section className="py-12 bg-[#0a0f1c] px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <input
            type="text"
            placeholder="Caută produse, utilizatori, categorii..."
            className="w-full md:w-2/3 px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400"
          />
          <a
            href="/dashboard"
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 transition font-semibold"
          >
            Dashboard
          </a>
        </div>
      </section>

      {/* FUNCȚIONALITĂȚI PRINCIPALE */}
      <section className="px-8 py-20 bg-[#05070d]">
        <h3 className="text-3xl font-bold text-center mb-12">Ce poate face platforma</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          <FeatureCard
            title="Economisești timp"
            desc="Automatizări inteligente care reduc munca repetitivă."
          />

          <FeatureCard
            title="Organizare eficientă"
            desc="Structurare clară a produselor, utilizatorilor și categoriilor."
          />

          <FeatureCard
            title="Interfață intuitivă"
            desc="Navigare rapidă, micro-interacțiuni și animații fluide."
          />
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-16 bg-[#0a0f1c] text-center">
        <h3 className="text-xl text-gray-400 mb-6">De încredere pentru profesioniști</h3>

        <div className="flex justify-center gap-10 opacity-70">
          <span className="text-lg">GDPR Compliant</span>
          <span className="text-lg">ISO Certified</span>
          <span className="text-lg">Secure Cloud</span>
        </div>
      </section>

      {/* BENTO GRID */}
      <section className="px-8 py-20 bg-[#05070d]">
        <h3 className="text-3xl font-bold text-center mb-12">Cum funcționează</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          <FeatureCard
            title="1. Adaugi produsele"
            desc="Import rapid sau adăugare manuală."
          />

          <FeatureCard
            title="2. Organizezi categoriile"
            desc="Structuri flexibile, ușor de navigat."
          />

          <FeatureCard
            title="3. Gestionezi utilizatorii"
            desc="Roluri, permisiuni și activitate în timp real."
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-gray-400 text-sm bg-[#05070d]">
        © {new Date().getFullYear()} GOSPO Electro Hub — All rights reserved.
      </footer>
    </div>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 shadow-lg hover:shadow-cyan-500/20 transition">
      <h4 className="text-xl font-semibold mb-3">{title}</h4>
      <p className="text-gray-300">{desc}</p>
    </div>
  );
}
