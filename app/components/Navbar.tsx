"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="w-full bg-[#070a20] text-white px-6 py-4 flex justify-between items-center border-b border-white/10">
      <Link href="/" className="text-2xl font-bold">
        ElectroHub
      </Link>

      <div className="flex items-center gap-6">

        <Link href="/services" className="hover:text-cyan-400">Servicii</Link>
        <Link href="/portfolio" className="hover:text-cyan-400">Portofoliu</Link>
        <Link href="/about" className="hover:text-cyan-400">Despre Noi</Link>
        <Link href="/contact" className="hover:text-cyan-400">Contact</Link>

        {session ? (
          <>
            <Link href="/my-account" className="hover:text-cyan-400">
              Contul meu
            </Link>

            <button
              onClick={() => signOut()}
              className="hover:text-red-400"
            >
              Delogare
            </button>
          </>
        ) : (
          <Link href="/login" className="hover:text-cyan-400">
            Autentificare
          </Link>
        )}
      </div>
    </nav>
  );
}
