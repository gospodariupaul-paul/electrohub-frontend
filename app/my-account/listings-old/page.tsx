"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MyListingsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 🔥 REDIRECT DACĂ NU E LOGAT
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    const API = process.env.NEXT_PUBLIC_API_URL;

    // 🔥 ENDPOINT CORECT: /me
    fetch(`${API}/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        let data;

        try {
          data = await res.json();
        } catch {
          data = null;
        }

        // 🔥 PRODUSELE SUNT ÎN /me → data.products
        if (data && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }

        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-white/60 p-6">Se încarcă produsele tale...</p>;
  }

  if (products.length === 0) {
    return (
      <div className="p-6 text-white/60">

        {/* 🔥 BUTON ÎNAPOI */}
        <Link
          href="/"
          className="inline-block mb-4 px-3 py-1.5 rounded-lg border border-white/20 hover:border-cyan-400 hover:text-cyan-300 transition text-sm"
        >
          ← Înapoi la homepage
        </Link>

        <p>Nu ai încă produse publicate.</p>
        <Link
          href="/add-product"
          className="text-cyan-400 underline mt-2 inline-block"
        >
          Adaugă primul tău produs →
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* 🔥 BUTON ÎNAPOI */}
      <Link
        href="/"
        className="inline-block mb-4 px-3 py-1.5 rounded-lg border border-white/20 hover:border-cyan-400 hover:text-cyan-300 transition text-sm"
      >
        ← Înapoi la homepage
      </Link>

      <h1 className="text-xl font-bold mb-4">Produsele mele</h1>

      <div className="grid md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <img
              src={
                Array.isArray(p.images) && p.images.length > 0
                  ? p.images[0]
                  : "/placeholder.png"
              }
              className="w-full h-40 object-cover rounded-lg mb-3"
            />

            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-cyan-300">{p.price} lei</p>

            <Link
              href={`/product/${p.id}`}
              className="text-xs text-cyan-400 underline mt-2 inline-block"
            >
              Vezi detalii →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
