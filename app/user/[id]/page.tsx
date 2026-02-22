"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axios";
import Link from "next/link";

export default function UserPublicPage() {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function load() {
      const u = await axiosInstance.get(`/users/${id}`);
      const p = await axiosInstance.get(`/products/user/${id}`);

      setUser(u.data);
      setProducts(p.data);
    }
    load();
  }, [id]);

  if (!user) return <p className="p-6 text-white">Se încarcă...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 text-white space-y-6">

      <h1 className="text-3xl font-bold">
        Profilul lui {user.name}
      </h1>

      <p className="opacity-70">{user.email}</p>

      <h2 className="text-2xl font-semibold mt-6">Produsele utilizatorului</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p: any) => (
          <div key={p.id} className="bg-white/5 border border-white/10 p-4 rounded-xl">
            <img src={p.imageUrl} className="w-full h-40 object-cover rounded-lg" />

            <h3 className="font-bold mt-2">{p.name}</h3>
            <p className="text-cyan-400 font-semibold">{p.price} lei</p>

            <Link
              href={`/product/${p.id}`}
              className="block mt-3 bg-cyan-500 text-black text-center py-2 rounded-lg"
            >
              Vezi produsul
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
