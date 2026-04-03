"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadCart = () => {
    axiosInstance
      .get("/cart/me", { withCredentials: true })
      .then((res) => setItems(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleDelete = async (productId: number) => {
    await axiosInstance.delete(`/cart/${productId}`, {
      withCredentials: true,
    });
    loadCart();
  };

  // 🔥 FINALIZEAZĂ COMANDA
  const handleCheckout = async () => {
    try {
      const res = await axiosInstance.post(
        "/orders",
        {},
        { withCredentials: true }
      );

      alert("Comanda a fost plasată cu succes!");

      // 🔥 REDIRECT CORECT
      router.push("/my-account/orders/success");
    } catch (err) {
      console.error(err);
      alert("A apărut o eroare la finalizarea comenzii.");
    }
  };

  if (loading) return <p className="text-white p-10">Se încarcă...</p>;

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-white">
      <h1 className="text-3xl font-bold mb-4">Coșul tău</h1>

      {/* 🔙 BUTON ÎNAPOI */}
      <button
        onClick={() => router.back()}
        className="mb-6 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm"
      >
        ← Înapoi
      </button>

      {items.length === 0 && (
        <p className="text-gray-400">Coșul tău este gol.</p>
      )}

      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 bg-white/10 rounded-lg border border-white/20"
          >
            <img
              src={item.product.images[0]}
              alt={item.product.name}
              className="w-24 h-24 object-cover rounded"
            />

            <div className="flex-1">
              <h2 className="text-lg font-semibold">{item.product.name}</h2>
              <p className="text-gray-300">
                Preț: {item.product.price} lei
              </p>
              <p className="text-gray-300">
                Cantitate: {item.quantity}
              </p>

              <Link
                href={`/product/${item.productId}`}
                className="text-[#00eaff] hover:underline text-sm"
              >
                ← Înapoi la produs
              </Link>
            </div>

            <button
              onClick={() => handleDelete(item.productId)}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded text-white"
            >
              Șterge
            </button>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <div className="mt-10 p-4 bg-white/10 rounded-lg border border-white/20">
          <h2 className="text-xl font-bold mb-2">Total: {total} lei</h2>

          <button
            onClick={handleCheckout}
            className="w-full mt-4 px-6 py-3 bg-[#00eaff] text-black rounded-lg font-semibold hover:bg-[#00c7d1] transition"
          >
            Finalizează comanda
          </button>
        </div>
      )}
    </div>
  );
}
