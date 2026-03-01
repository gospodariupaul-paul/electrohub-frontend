"use client";

import "./globals.css";
import { UserProvider } from "./context/UserContext";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiBell, FiHeart, FiShoppingCart, FiUser, FiHome } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";

export default function RootLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <html lang="ro">
      <body className="bg-[#0b141a] text-white">
        <UserProvider>

          {/* 🔥 HEADER FUTURIST GLOBAL */}
          <header className="sticky top-0 z-50 bg-[#0d1117]/90 backdrop-blur-md border-b border-white/10 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

              {/* 🔥 Stânga: Meniu + Logo */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="text-2xl text-gray-300 hover:text-[#00eaff] transition"
                >
                  <FiMenu />
                </button>

                {/* LOGO GOSPO Electro Hub */}
                <Link href="/" className="text-2xl font-bold tracking-wide text-[#00eaff]">
                  GOSPO <span className="text-white">Electro Hub</span>
                </Link>
              </div>

              {/* 🔥 Mijloc: Căutare futuristă */}
              <div className="hidden md:flex flex-1 mx-6">
                <div className="flex items-center w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-2 shadow-inner">
                  <IoSearch className="text-xl text-gray-400" />
                  <input
                    type="text"
                    placeholder="Caută produse, modele, categorii..."
                    className="flex-1 bg-transparent outline-none text-sm text-gray-200 ml-3"
                  />
                </div>
              </div>

              {/* 🔥 Dreapta: Acțiuni utilizator */}
              <div className="flex items-center gap-5 text-xl">

                {/* HOME BUTTON */}
                <Link href="/" className="hover:text-[#00eaff] transition">
                  <FiHome />
                </Link>

                {/* 🔥 MODIFICAT: Vinde → /my-account/profile */}
                <Link
                  href="/my-account/profile"
                  className="hidden md:block bg-[#00eaff] text-black px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#00c7d6] transition"
                >
                  Vinde
                </Link>

                <Link href="/wishlist" className="hover:text-[#00eaff] transition">
                  <FiHeart />
                </Link>

                <Link href="/cart" className="hover:text-[#00eaff] transition relative">
                  <FiShoppingCart />
                  <span className="absolute -top-2 -right-2 bg-[#00eaff] text-black text-xs px-1.5 py-0.5 rounded-full">
                    2
                  </span>
                </Link>

                <Link href="/notifications" className="hover:text-[#00eaff] transition">
                  <FiBell />
                </Link>

                <Link href="/my-account" className="hover:text-[#00eaff] transition">
                  <FiUser />
                </Link>
              </div>
            </div>

            {/* 🔥 Meniu categorii (hamburger) */}
            {menuOpen && (
              <div className="bg-[#0d1117] border-t border-white/10 p-4 space-y-3 md:hidden">
                <Link href="/category/componente" className="block text-gray-300 hover:text-[#00eaff] transition">
                  Componente
                </Link>
                <Link href="/category/electrocasnice" className="block text-gray-300 hover:text-[#00eaff] transition">
                  Electrocasnice
                </Link>
                <Link href="/category/it" className="block text-gray-300 hover:text-[#00eaff] transition">
                  IT
                </Link>
                <Link href="/category/gadgeturi" className="block text-gray-300 hover:text-[#00eaff] transition">
                  Gadgeturi
                </Link>
              </div>
            )}
          </header>

          {/* 🔥 Conținutul paginii */}
          <main className="pt-4">{children}</main>

        </UserProvider>
      </body>
    </html>
  );
}
