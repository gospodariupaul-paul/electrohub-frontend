"use client";

import Image from "next/image";
import { FaSearch, FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0d14] text-white">

      {/* HEADER */}
      <header className="w-full border-b border-white/10 bg-[#0f131b] px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        
        {/* LOGO */}
        <a href="/" className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          GOSPO Electro Hub
        </a>

        {/* SEARCH BAR */}
        <div className="flex items-center bg-white/10 border border-white/10 rounded-xl px-4 py-2 w-full max-w-xl">
          <FaSearch className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Caută modele, serii sau produse (ex: iPhone 13 Pro)"
            className="bg-transparent outline-none text-white w-full placeholder-gray-400"
          />
        </div>

        {/* USER ACTIONS */}
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

      {/* ⭐⭐⭐ HERO CU IMAGINEA TA LOCALĂ ⭐⭐⭐ */}
      <section className="relative w-full h-[480px] flex items-center justify-center text-center">

        {/* BACKGROUND IMAGE LOCALĂ */}
        <Image
          src="/circuite.jpg"   // ← poza ta din public/
          alt="Circuite integrate"
          fill
          className="object-cover opacity-40"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90" />

        {/* CONTENT */}
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

      {/* TRUST BAR */}
      <section className="grid grid-cols-3 text-center py-6 bg-[#0f131b] border-b border-white/10">
        <p className="text-gray-300">🚚 Livrare rapidă</p>
        <p className="text-gray-300">↩️ Retur gratuit 30 zile</p>
        <p className="text-gray-300">🛡️ Garanție extinsă</p>
      </section>

      {/* POPULAR CATEGORIES */}
      <section className="px-6 py-12">
        <h3 className="text-2xl font-bold mb-6">Categorii Populare</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Smartphone", "Laptopuri", "Audio-Video", "Smart Home"].map((cat) => (
            <div key={cat} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition">
              <p className="text-lg font-semibold">{cat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-12 bg-[#0f131b] border-t border-white/10 text-gray-400 text-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h4 className="font-semibold text-white mb-3">Suport</h4>
            <p>Contact</p>
            <p>FAQ</p>
            <p>Retur & Garanție</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Companie</h4>
            <p>Despre noi</p>
            <p>Cariere</p>
            <p>Presă</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Legal</h4>
            <p>Termeni & Condiții</p>
            <p>Politica de Confidențialitate</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Urmărește-ne</h4>
            <p>Facebook</p>
            <p>Instagram</p>
            <p>YouTube</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
