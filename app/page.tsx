"use client";

import Image from "next/image";
import { FaSearch, FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0d14] text-white">

      {/* HEADER */}
      <header className="w-full border-b border-white/10 bg-[#0f131b] px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        
        <a href="/" className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          GOSPO Electro Hub
        </a>

        <div className="flex items-center bg-white/10 border border-white/10 rounded-xl px-4 py-2 w-full max-w-xl">
          <FaSearch className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Caută modele, serii sau produse (ex: iPhone 13 Pro)"
            className="bg-transparent outline-none text-white w-full placeholder-gray-400"
          />
        </div>

        <div className="flex items-center gap-6 text-xl">
          <a href="/favorites" className="hover:text-cyan-400 transition"><FaHeart /></a>
          <a href="/cart" className="hover:text-cyan-400 transition relative">
            <FaShoppingCart />
            <span className="absolute -top-2 -right-2 bg-cyan-500 text-xs px-1.5 py-0.5 rounded-full">0</span>
          </a>
          <a href="/login" className="hover:text-cyan-400 transition"><FaUser /></a>
        </div>
      </header>

      {/* CATEGORY MENU */}
      <nav className="w-full bg-[#0f131b] border-b border-white/10 px-6 py-3 flex gap-6 text-gray-300 text-sm">
        <a href="#" className="hover:text-white transition">Telefoane</a>
        <a href="#" className="hover:text-white transition">Laptopuri</a>
        <a href="#" className="hover:text-white transition">Smart Home</a>
        <a href="#" className="hover:text-white transition">Electrocasnice</a>
        <a href="#" className="hover:text-white transition">Audio-Video</a>
        <a href="#" className="hover:text-white transition">Oferte</a>
      </nav>

      {/* ⭐⭐⭐ HERO CU POZA TA ⭐⭐⭐ */}
      <section className="relative w-full h-[480px] flex items-center justify-center text-center">

        {/* BACKGROUND IMAGE LOCALĂ */}
        <Image
          src="/circuite.png"   // ← poza ta
          alt="Circuite integrate"
          fill
          className="object-cover"
        />

        {/* OVERLAY MAI TRANSPARENT */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />

        <div className="relative z-10 max-w-3xl px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Puterea Tehnologiei în Mâinile Tale
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8">
            GOSPO Electro Hub îți oferă control total asupra electronicelor, produselor și categoriilor — rapid, sigur și intuitiv.
          </p>

          <a
            href="/register"
            className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-semibold text-lg shadow-lg transition"
          >
            Începe Acum
          </a>
        </div>
      </section>
    </div>
  );
}
