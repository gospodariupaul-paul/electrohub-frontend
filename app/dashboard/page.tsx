"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="min-h-screen flex bg-black text-white">

      {/* SIDEBAR FUTURIST */}
      <aside className="w-72 bg-gradient-to-b from-gray-900 to-black border-r border-white/10 p-6 flex flex-col gap-6 shadow-2xl">

        {/* LOGO */}
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">
          GOSPO Hub
        </h1>

        {/* NAVIGATION */}
        <nav className="flex flex-col gap-4 text-lg">

          <Link
            href="/dashboard"
            className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            Dashboard
          </Link>

          <Link
            href="/settings"
            className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            Settings
          </Link>

          {/* BUTOANE NOI */}
          <Link
            href="/orders"
            className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            Orders
          </Link>

          <Link
            href="/products"
            className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            Products
          </Link>

          <Link
            href="/analytics"
            className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            Analytics
          </Link>

          <Link
            href="/messages"
            className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            Messages
          </Link>

          {/* LOGOUT */}
          <button
            onClick={() => signOut()}
            className="p-3 rounded-lg bg-red-600 hover:bg-red-700 transition text-left"
          >
            Logout
          </button>
        </nav>

        {/* FOOTER */}
        <div className="mt-auto opacity-40 text-sm">
          <p>© 2026 GOSPO Electro Hub</p>
        </div>
      </aside>

      {/* CONȚINUT DASHBOARD */}
      <section className="flex-1 p-10">
        <h2 className="text-4xl font-bold mb-6">Dashboard</h2>

        <p className="opacity-80 text-lg">
          Bine ai venit în centrul tău de control futurist.
        </p>
      </section>
    </main>
  );
}
