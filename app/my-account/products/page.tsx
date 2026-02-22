"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MyProductsPage() {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!session) return;

    fetch(`/api/products/user/${session.user.id}`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, [session]);

  if (!session) {
    return <div className="text-white p-6">Trebuie să fii logat.</div>;
  }

  return (
    <div className="text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Produsele mele</h1>

      <Link
        href="/my-account/products/add"
        className="px-4 py-2 bg-cyan-500 text-black rounded-lg"
      >
        Adaugă produs
      </Link>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {products.map((p: any) => (
          <div key={p._id} className="bg-white/5 p-4 rounded-xl border border-white/10">
            <img src={p.images?.[0]} className="w-full h-32 object-cover rounded-lg" />
            <p className="mt-2 font-semibold">{p.title}</p>
            <p className="text-cyan-400">{p.price} RON</p>
          </div>
        ))}
      </div>
    </div>
  );
}
