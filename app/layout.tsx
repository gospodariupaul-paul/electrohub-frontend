"use client";

import "./globals.css";
import { UserProvider } from "./context/UserContext";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiBell, FiHeart, FiHome } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { useUser } from "./context/UserContext";

export default function RootLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user } = useUser(); // user real

  return (
    <html lang="ro">
      <body className="bg-[#0b141a] text-white">
        <UserProvider>

          {/* HEADER */}
          <header className="sticky top-0 z-50 border-b border-white/10 shadow-lg bg-[#0d1117]/90 backdrop-blur-md">
            <div className="pointer-events-none absolute inset-0"></div>

            <div className="relative pointer-events-auto max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

              {/* Stânga */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="text-2xl text-gray-300 hover:text-[#00eaff] transition"
                >
                  <FiMenu />
                </button>

                <Link href="/" className="text-2xl font-bold tracking-wide text-[#00eaff]">
                  GOSPO <span className="text-white">Electro Hub</span>
                </Link>
              </div>

              {/* Căutare */}
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

              {/* Dreapta */}
              <div className="flex items-center gap-5 text-xl">

                <Link href="/" className="hover:text-[#00eaff] transition">
                  <FiHome />
                </Link>

                <Link
                  href="/my-account/profile"
                  className="hidden md:block bg-[#00eaff] text-black px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#00c7d6] transition"
                >
                  Vinde
                </Link>

                <Link href="/wishlist" className="hover:text-[#00eaff] transition">
                  <FiHeart />
                </Link>

                <Link href="/notifications" className="hover:text-[#00eaff] transition">
                  <FiBell />
                </Link>

                {/* MENIU PROFIL OLX-STYLE */}
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="text-2xl transition"
                    style={{ color: "white" }} // 👤 ALB ȘI VIZIBIL
                  >
                    👤
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-[#0f172a] border border-white/10 rounded-xl shadow-xl p-2 z-50">

                      {/* 🔵 Utilizator NELOGAT */}
                      {!user && (
                        <>
                          <Link href="/login" className="block px-4 py-2 hover:bg-white/10 rounded">
                            Autentificare
                          </Link>
                          <Link href="/register" className="block px-4 py-2 hover:bg-white/10 rounded">
                            Creează cont
                          </Link>
                          <Link href="/help" className="block px-4 py-2 hover:bg-white/10 rounded">
                            Ajutor / Contact
                          </Link>
                        </>
                      )}

                      {/* 🟢 Utilizator LOGAT */}
                      {user && (
                        <>
                          <Link href="/my-account/profile" className="block px-4 py-2 hover:bg-white/10 rounded">
                            Profilul meu
                          </Link>
                          <Link href="/my-account/listings" className="block px-4 py-2 hover:bg-white/10 rounded">
                            Anunțurile mele
                          </Link>
                          <Link href="/my-account/profile" className="block px-4 py-2 hover:bg-white/10 rounded">
                            Adaugă anunț
                          </Link>
                          <Link href="/wishlist" className="block px-4 py-2 hover:bg-white/10 rounded">
                            Favorite
                          </Link>
                          <Link href="/account/searches" className="block px-4 py-2 hover:bg-white/10 rounded">
                            Căutări salvate
                          </Link>
                          <Link href="/notifications" className="block px-4 py-2 hover:bg-white/10 rounded">
                            Notificări
                          </Link>
                          <Link href="/account/settings" className="block px-4 py-2 hover:bg-white/10 rounded">
                            Setări cont
                          </Link>

                          {/* 🔥 ACUM APARE LOGOUT */}
                          <Link href="/logout" className="block px-4 py-2 text-red-400 hover:bg-white/10 rounded">
                            Deconectare
                          </Link>
                        </>
                      )}
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Meniu mobil */}
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

          <main className="pt-4">{children}</main>

        </UserProvider>
      </body>
    </html>
  );
}
