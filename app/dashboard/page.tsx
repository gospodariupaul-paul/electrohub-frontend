"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Dashboard() {
  const [items, setItems] = useState([
    { id: 1, name: "Sistem Monitorizare" },
    { id: 2, name: "Panou Control" },
    { id: 3, name: "Modul Senzori" },
  ]);

  function deleteItem(id) {
    setItems(items.filter((i) => i.id !== id));
  }

  return (
    <main className="min-h-screen flex bg-white text-gray-900">

      {/* SIDEBAR FUTURIST TEHNIC */}
      <aside className="w-72 bg-gradient-to-b from-gray-200 to-gray-300 border-r border-gray-400 p-6 flex flex-col gap-4 shadow-xl">

        <h1 className="text-2xl font-extrabold tracking-tight text-gray-800">
          GOSPO Hub
        </h1>

        <nav className="flex flex-col gap-2 text-sm font-medium">

          <Link href="/dashboard" className="p-2 rounded-lg hover:bg-gray-400/40 transition">
            Dashboard
          </Link>

          <Link href="/dashboard/settings" className="p-2 rounded-lg hover:bg-gray-400/40 transition">
            Settings
          </Link>

          <Link href="/dashboard/products" className="p-2 rounded-lg hover:bg-gray-400/40 transition">
            Products
          </Link>

          <Link href="/dashboard/orders" className="p-2 rounded-lg hover:bg-gray-400/40 transition">
            Orders
          </Link>

          <Link href="/dashboard/analytics" className="p-2 rounded-lg hover:bg-gray-400/40 transition">
            Analytics
          </Link>

          <Link href="/dashboard/messages" className="p-2 rounded-lg hover:bg-gray-400/40 transition">
            Messages
          </Link>

          <button
            onClick={() => signOut()}
            className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition mt-4"
          >
            Logout
          </button>
        </nav>

        <div className="mt-auto text-xs opacity-60">
          © 2026 GOSPO Electro Hub
        </div>
      </aside>

      {/* CONȚINUT DASHBOARD */}
      <section className="flex-1 p-10">

        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

        <p className="text-sm opacity-70 mb-6">
          Panou tehnic de control — versiune minimalistă, fundal alb, text mic.
        </p>

        {/* LISTĂ ELEMENTE CU DELETE */}
        <div className="bg-gray-100 border border-gray-300 rounded-xl p-6 max-w-xl">
          <h3 className="text-xl font-semibold mb-4">Module active</h3>

          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="p-3 bg-white border border-gray-300 rounded-lg flex justify-between items-center text-sm relative"
                onContextMenu={(e) => {
                  e.preventDefault();
                  deleteItem(item.id);
                }}
              >
                {item.name}

                <button
                  onClick={() => deleteItem(item.id)}
                  className="text-red-600 hover:text-red-800 text-xs font-semibold"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <p className="text-xs opacity-60 mt-3">
            Poți șterge un element fie cu butonul Delete, fie cu click dreapta.
          </p>
        </div>
      </section>
    </main>
  );
}
