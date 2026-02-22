"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="w-full bg-[#0f131b] border-b border-white/10 p-4 flex items-center justify-between text-white">
      <Link href="/" className="text-xl font-bold">
        ElectroHub
      </Link>

      {/* 🔥 Dacă userul este logat */}
      {session ? (
        <div className="flex items-center gap-6">

          <Link href="/chat" className="hover:text-cyan-400">
            Chat
          </Link>

          <Link href="/notifications" className="hover:text-cyan-400">
            Notificări
          </Link>

          <Link href={`/user/${session.user.id}`} className="hover:text-cyan-400">
            Contul tău
          </Link>

          <Link
            href="/dashboard/products/add"
            className="px-4 py-2 bg-emerald-500 text-black rounded-lg font-semibold"
          >
            Adaugă anunț nou
          </Link>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="px-4 py-2 bg-red-500 text-black rounded-lg font-semibold"
          >
            Logout
          </button>

        </div>
      ) : (
        /* 🔥 Dacă userul NU este logat */
        <Link href="/login" className="hover:text-cyan-400">
          Autentificare
        </Link>
      )}
    </nav>
  );
}
