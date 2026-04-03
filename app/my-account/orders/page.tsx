"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface OrderItem {
  product: {
    name: string;
    images: string[];
  };
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  createdAt: string;
  total: number;
  items: OrderItem[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const API = process.env.NEXT_PUBLIC_API_URL;

        // 1️⃣ Luăm userul logat din /auth/me (folosește cookie-ul httpOnly "jwt")
        const meRes = await fetch(`${API}/auth/me`, {
          credentials: "include",
        });

        if (!meRes.ok) {
          console.error("Nu ești logat sau /auth/me a eșuat");
          setLoading(false);
          return;
        }

        const me = await meRes.json();
        const userId = me.id;

        // 2️⃣ Luăm comenzile userului logat
        const res = await fetch(`${API}/orders/user/${userId}`, {
          credentials: "include",
        });

        if (!res.ok) {
          console.error("Eroare la încărcarea comenzilor");
          setLoading(false);
          return;
        }

        const data: Order[] = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Eroare API:", err);
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-400">
        Se încarcă comenzile...
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-20 text-gray-300">
        <img
          src="/empty-orders.png"
          alt="Nu ai comenzi"
          className="mx-auto w-40 opacity-80 mb-6"
        />
        <h2 className="text-2xl font-bold mb-2">Nu ai nicio comandă</h2>
        <p className="text-gray-400 mb-6">
          Când vei cumpăra ceva, comenzile tale vor apărea aici.
        </p>
        <Link
          href="/"
          className="bg-[#00eaff] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#00c7d6] transition"
        >
          Caută produse
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Comenzile mele</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-[#0f172a] border border-white/10 rounded-xl p-5 shadow-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-lg font-semibold">#{order.id}</p>
                <p className="text-gray-400 text-sm">
                  {new Date(order.createdAt).toLocaleString("ro-RO")}
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {order.items.map((p, index) => (
                <div key={index} className="text-gray-300 text-sm">
                  • {p.product.name} – {p.quantity} buc – {p.price} lei
                </div>
              ))}
            </div>

            <p className="font-bold text-lg mb-4">
              Total: {order.total} lei
            </p>

            <div className="flex gap-3 flex-wrap">
              <Link
                href={`/my-account/orders/${order.id}`}
                className="bg-[#00eaff] text-black px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#00c7d6] transition flex items-center gap-2"
              >
                Vezi detalii
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
