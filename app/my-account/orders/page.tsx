"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiPackage, FiFileText, FiTruck, FiXCircle } from "react-icons/fi";

interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number | string;
  date: string;
  status: "livrata" | "in_tranzit" | "procesare" | "anulata";
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

        // 🔥 EXTRAGEM USER ID DIN JWT
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("access_token="))
          ?.split("=")[1];

        if (!token) {
          console.error("Nu există token");
          return;
        }

        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.sub;

        // 🔥 CEREM COMENZILE USERULUI LOGAT
        const res = await fetch(`${API}/orders/user/${userId}`, {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Eroare la încărcarea comenzilor");
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

  const statusBadge = (status: Order["status"]) => {
    const styles: Record<Order["status"], string> = {
      livrata: "bg-green-600/20 text-green-400 border border-green-600/40",
      in_tranzit: "bg-blue-600/20 text-blue-400 border border-blue-600/40",
      procesare: "bg-yellow-600/20 text-yellow-400 border border-yellow-600/40",
      anulata: "bg-red-600/20 text-red-400 border border-red-600/40",
    };

    const labels: Record<Order["status"], string> = {
      livrata: "Livrată",
      in_tranzit: "În tranzit",
      procesare: "În procesare",
      anulata: "Anulată",
    };

    return (
      <span className={`px-3 py-1 rounded-lg text-sm ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

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
                <p className="text-gray-400 text-sm">{order.date}</p>
              </div>
              {statusBadge(order.status)}
            </div>

            <div className="space-y-2 mb-4">
              {order.items.slice(0, 3).map((p, index) => (
                <div key={index} className="text-gray-300 text-sm">
                  • {p.productName} – {p.quantity} buc – {p.price} lei
                </div>
              ))}

              {order.items.length > 3 && (
                <div className="text-gray-500 text-sm">
                  +{order.items.length - 3} produse
                </div>
              )}
            </div>

            <p className="font-bold text-lg mb-4">
              Total: {order.total} lei
            </p>

            <div className="flex gap-3 flex-wrap">
              <Link
                href={`/my-account/orders/${order.id}`}
                className="bg-[#00eaff] text-black px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#00c7d6] transition flex items-center gap-2"
              >
                <FiFileText /> Vezi detalii
              </Link>

              <button className="bg-white/10 px-4 py-2 rounded-lg text-sm hover:bg-white/20 transition flex items-center gap-2">
                <FiPackage /> Descarcă factura
              </button>

              {order.status === "in_tranzit" && (
                <button className="bg-blue-600/20 text-blue-400 border border-blue-600/40 px-4 py-2 rounded-lg text-sm hover:bg-blue-600/30 transition flex items-center gap-2">
                  <FiTruck /> Track order
                </button>
              )}

              {order.status === "anulata" && (
                <button className="bg-red-600/20 text-red-400 border border-red-600/40 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                  <FiXCircle /> Comandă anulată
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
