"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { signOut as nextAuthSignOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession(); // admin login
  const [user, setUser] = useState<any>(null); // normal user login

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => {});
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

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

          {session ? (
            <button
              onClick={() => nextAuthSignOut({ callbackUrl: "/" })}
              className="px-4 py-2 bg-red-500 text-black rounded-lg font-semibold"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-black rounded-lg font-semibold"
            >
              Logout
            </button>
          )}

        </div>
      ) : (
        <Link href="/login" className="hover:text-cyan-400">
          Autentificare
        </Link>
      )}
    </nav>
  );
}
