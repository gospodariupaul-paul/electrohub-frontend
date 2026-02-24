"use client";

import { useUser } from "@/app/context/UserContext";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import Link from "next/link";

export default function MyProductsPage() {
  const { user } = useUser();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!user) return;

    axiosInstance
      .get(`/products/user/${user.id}`)
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]));
  }, [user]);

  if (!user) {
    return (
      <div className="p-6 text-white">
        <h1 className="text-xl font-bold">Trebuie să fii logat</h1>
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Produsele mele</h1>

      <Link
        href="/my-account/products/add"
        className="px-4 py-2 bg-cyan-600 rounded-lg"
      >
        Adaugă produs
      </Link>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {products.map((p: any) => (
          <div
            key={p.id}
            className="bg-white/5 p-4 rounded-xl border border-white/10"
          >
            <img
              src={p.images?.[0] || "/placeholder.png"}
              className="w-full h-32 object-cover rounded-lg"
            />

            <p className="mt-2 font-semibold">{p.name}</p>
            <p className="text-cyan-400">{p.price} lei</p>

            <p className="text-xs mt-1 opacity-70">
              Status: <span className="capitalize">{p.status}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
