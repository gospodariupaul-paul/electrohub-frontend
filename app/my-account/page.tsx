"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function MyAccountPage() {
  const { data: session } = useSession();

  return (
    <div className="p-6 text-white space-y-6">

      {/* TITLU */}
      <h1 className="text-3xl font-bold">
        Bun venit, {session?.user?.name || "utilizator"}!
      </h1>

      <p className="opacity-70">
        Aici îți poți gestiona produsele, mesajele și profilul — exact ca pe OLX.
      </p>

      {/* CARDURI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Produsele mele */}
        <Link
          href="/my-account/products"
          className="bg-[#070a20] border border-white/10 p-6 rounded-xl hover:border-cyan-400 transition"
        >
          <h2 className="text-xl font-semibold">Produsele mele</h2>
          <p className="opacity-70 text-sm mt-2">
            Vezi, adaugă și editează produsele tale.
          </p>
        </Link>

        {/* Mesaje */}
        <Link
          href="/my-account/messages"
          className="bg-[#070a20] border border-white/10 p-6 rounded-xl hover:border-cyan-400 transition"
        >
          <h2 className="text-xl font-semibold">Mesaje</h2>
          <p className="opacity-70 text-sm mt-2">
            Discută cu alți utilizatori despre produsele lor.
          </p>
        </Link>

        {/* Profil */}
        <Link
          href="/my-account/profile"
          className="bg-[#070a20] border border-white/10 p-6 rounded-xl hover:border-cyan-400 transition"
        >
          <h2 className="text-xl font-semibold">Profilul meu</h2>
          <p className="opacity-70 text-sm mt-2">
            Editează-ți informațiile personale.
          </p>
        </Link>

      </div>
    </div>
  );
}
