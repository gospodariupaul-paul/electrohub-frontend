"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";


export default function DashboardPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [pRes, cRes, uRes] = await Promise.all([
          axiosInstance.get("/products"),
          axiosInstance.get("/categories"),
          axiosInstance.get("/users"),
        ]);

        setProducts(pRes.data || []);
        setCategories(cRes.data || []);
        setUsers(uRes.data || []);
      } catch (e) {
        console.error("Eroare:", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <header>
        <h1 className="text-3xl font-bold tracking-wide">AI Dashboard</h1>
        <p className="text-sm text-white/60">
          GOSPO Electro Hub • Futuristic Neon HUD
        </p>
      </header>

      {/* STATUS */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-cyan-900/40 via-transparent to-purple-900/40 border border-cyan-500/40 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-2">
            Bună, <span className="text-cyan-400">Paul‑Stelian</span> 👋
          </h2>
          <p className="opacity-80">
            AI-ul monitorizează produsele, categoriile și utilizatorii.
          </p>
        </div>

        <div className="bg-[#05071a] border border-purple-500/40 rounded-2xl p-6">
          <p className="text-sm uppercase tracking-wide text-purple-300 mb-1">
            Neural Core Status
          </p>
          <p className="text-3xl font-bold text-green-400">Online</p>
          <p className="text-xs opacity-60 mt-2">
            Ultima sincronizare AI: acum 2 minute.
          </p>
        </div>
      </section>

      {/* PRODUSE */}
      <section className="bg-[#05071a] border border-white/15 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-cyan-300">Produse</h3>
          <a
            href="/dashboard/products/add"
            className="text-xs px-3 py-1 rounded bg-cyan-600 hover:bg-cyan-500 transition"
          >
            + Adaugă produs
          </a>
        </div>

        {loading ? (
          <p className="opacity-70">Se încarcă...</p>
        ) : products.length === 0 ? (
          <p className="opacity-70">Nu există produse.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((p: any) => (
              <div
                key={p.id}
                className="bg-[#070a20] border border-white/10 rounded-xl p-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{p.name}</h4>
                  <span className="text-sm font-bold text-cyan-300">
                    {p.price} lei
                  </span>
                </div>
                <p className="text-xs opacity-70">{p.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CATEGORII */}
      <section className="bg-[#05071a] border border-white/15 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-cyan-300 mb-3">Categorii</h3>

        {loading ? (
          <p className="opacity-70">Se încarcă...</p>
        ) : categories.length === 0 ? (
          <p className="opacity-70">Nu există categorii.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {categories.map((c: any) => (
              <li
                key={c.id}
                className="flex items-center justify-between border-b border-white/5 pb-1"
              >
                <span>{c.name}</span>
                <span className="text-xs opacity-60">
                  {c.productCount || 0} produse
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* USERI */}
      <section className="bg-[#05071a] border border-white/15 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-cyan-300 mb-3">Useri</h3>

        {loading ? (
          <p className="opacity-70">Se încarcă...</p>
        ) : users.length === 0 ? (
          <p className="opacity-70">Nu există useri.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {users.map((u: any) => (
              <li
                key={u.id}
                className="flex items-center justify-between border-b border-white/5 pb-1"
              >
                <span>{u.name || u.email}</span>
                <span className="text-xs opacity-60">{u.role}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
