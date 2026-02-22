"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useUser } from "../context/UserContext";

export default function Navbar() {
  const { data: session } = useSession(); // admin
  const { user } = useUser(); // user normal

  const loggedUser = user || session?.user;

  return (
    <nav className="w-full bg-[#0f131b] border-b border-white/10 p-4 flex items-center justify-between text-white">
      <Link href="/" className="text-xl font-bold">
        ElectroHub
      </Link>

      {loggedUser ? (
        <div className="flex items-center gap-6">

          <Link href="/chat" className="hover:text-cyan-400">
            Chat
          </Link>

          <Link href="/notifications" className="hover:text-cyan-400">
            Notificări
          </Link>

          <Link href={`/user/${loggedUser.id}`} className="hover:text-cyan-400">
            Contul tău
          </Link>

          <Link
            href="/dashboard/products/add"
            className="px-4 py-2 bg-emerald-500 text-black rounded-lg font-semibold"
          >
            Adaugă anunț nou
          </Link>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              signOut({ callbackUrl: "/" });
              window.location.href = "/";
            }}
            className="px-4 py-2 bg-red-500 text-black rounded-lg font-semibold"
          >
            Logout
          </button>

        </div>
      ) : (
        <Link href="/login" className="hover:text-cyan-400">
          Autentificare
        </Link>
      )}
    </nav>
  );
}
