"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function UserPublicPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const [user, setUser] = useState<any>(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const u = await axiosInstance.get(`/users/${id}`);
        const p = await axiosInstance.get(`/products/user/${id}`);

        setUser(u.data);
        setProducts(p.data);
      } catch (err) {
        console.error("Eroare la încărcare:", err);
      }
    }
    load();
  }, [id]);

  // Dacă userul este logat și intră pe pagina lui → îl trimitem aici automat
  useEffect(() => {
    if (session && session.user?.id) {
      router.push(`/user/${session.user.id}`);
    }
  }, [session, router]);

  if (!user) return <p className="p-6 text-white">Se încarcă...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 text-white space-y-6">

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Profilul lui {user.name}
        </h1>

        {/* Dacă userul este pe pagina lui → poate adăuga produse */}
        {session?.user?.id == id && (
          <Link
            href="/dashboard/products/add"
            className="px-4 py-2 bg-emerald-500 text-black rounded-lg font-semibold"
          >
            Adaugă produs
          </Link>
        )}
      </div>

      <p className="opacity-70">{user.email}</p>

      <h2 className="text-2xl font-semibold mt-6">Produsele utilizatorului</h2>

      {products.length === 0 && (
        <p className="text-white/60">Acest utilizator nu a adăugat încă produse.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p: any) => (
          <div key={p.id} className="bg-white/5 border border-white/10 p-4 rounded-xl">
            {p.imageUrl && (
              <img
                src={p.imageUrl}
                className="w-full h-40 object-cover rounded-lg"
              />
            )}

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
