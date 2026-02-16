"use client";

import Image from "next/image";
import { FaGoogle, FaGithub, FaApple, FaYahoo } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#05070d] text-white flex flex-col">

      {/* HEADER */}
      <header className="w-full flex justify-between items-center px-8 py-6 bg-transparent absolute top-0 left-0 z-20">
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

        {/* BACKGROUND IMAGE */}
        <Image
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1920"
          alt="Electronics Background"
          fill
          className="object-cover opacity-30"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90" />

        {/* HERO CONTENT */}
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-xl">
            Organizează, Gestionează și Scalează
          </h2>

          <p className="text-lg md:text-xl text-gray-300 mb-10">
            GOSPO Electro Hub este platforma futuristă care îți oferă control total
            asupra electronicelor, utilizatorilor și categoriilor — rapid, sigur și intuitiv.
          </p>

          {/* CTA */}
          <a
            href="/register"
            className="px-8 py-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 transition font-bold text-lg shadow-lg"
          >
            Creează un cont gratuit
          </a>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-16 bg-[#0a0f1c] text-center">
        <h3 className="text-xl text-gray-400 mb-6">De încredere pentru profesioniști din industrie</h3>

        <div className="flex justify-center gap-10 opacity-70">
          <span className="text-lg">GDPR Compliant</span>
          <span className="text-lg">ISO Certified</span>
          <span className="text-lg">Secure Cloud</span>
        </div>
      </section>

      {/* FEATURES — BENTO GRID */}
      <section className="px-8 py-20 bg-[#05070d]">
        <h3 className="text-3xl font-bold text-center mb-12">Funcționalități principale</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          <FeatureCard
            title="Gestionare Produse"
            desc="Adaugă, editează și organizează produsele tale într-un mod intuitiv."
          />

          <FeatureCard
            title="Administrare Utilizatori"
            desc="Controlează accesul, rolurile și activitatea utilizatorilor."
          />

          <FeatureCard
            title="Categorii Inteligente"
            desc="Organizează produsele în categorii dinamice și ușor de navigat."
          />
        </div>
      </section>

      {/* SOCIAL LOGIN */}
      <section className="py-20 bg-[#0a0f1c] text-center">
        <h3 className="text-3xl font-bold mb-10">Autentificare rapidă</h3>

        <div className="flex flex-col gap-4 max-w-sm mx-auto">

          <SocialButton
            icon={<FaGoogle className="text-xl" />}
            label="Continuă cu Google"
            color="bg-red-500/20 hover:bg-red-500/40"
          />

          <SocialButton
            icon={<FaGithub className="text-xl" />}
            label="Continuă cu GitHub"
            color="bg-gray-500/20 hover:bg-gray-500/40"
          />

          <SocialButton
            icon={<FaApple className="text-xl" />}
            label="Continuă cu Apple"
            color="bg-white/10 hover:bg-white/20"
          />

          <SocialButton
            icon={<FaYahoo className="text-xl" />}
            label="Continuă cu Yahoo"
            color="bg-purple-500/20 hover:bg-purple-500/40"
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

function SocialButton({ icon, label, color }) {
  return (
    <button
      className={`flex items-center justify-center gap-3 px-6 py-3 rounded-xl border border-white/10 transition ${color}`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}
