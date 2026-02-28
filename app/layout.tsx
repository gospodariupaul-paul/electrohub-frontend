"use client";

import "./globals.css";
import { UserProvider } from "./context/UserContext";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <body className="bg-[#0b141a] text-white">

        <UserProvider>

          {/* 🔥 HEADER GLOBAL — apare pe TOATE paginile */}
          <header className="h-16 bg-[#202c33] border-b border-black/20 flex items-center px-6 justify-between shadow-md">
            <Link href="/" className="text-xl font-bold text-[#00a884]">
              ElectroHub
            </Link>

            <nav className="flex items-center gap-6 text-sm">
              <Link href="/my-account/messages" className="hover:text-[#00a884] transition">
                Mesaje
              </Link>

              <Link href="/my-account" className="hover:text-[#00a884] transition">
                Contul meu
              </Link>

              <Link href="/products" className="hover:text-[#00a884] transition">
                Produse
              </Link>
            </nav>
          </header>

          {/* 🔥 Conținutul fiecărei pagini */}
          <main>{children}</main>

        </UserProvider>

      </body>
    </html>
  );
}
