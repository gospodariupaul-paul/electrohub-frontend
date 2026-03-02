"use client";

import { useEffect, useState } from "react";
import { FaTrash, FaHeart, FaShoppingCart, FaLock } from "react-icons/fa";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const updateQuantity = (id, amount) => {
    const updated = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 300 ? 0 : 20;
  const taxes = subtotal * 0.19;
  const total = subtotal + shipping + taxes;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Coșul tău de cumpărături</h1>

      {cart.length === 0 ? (
        <p>Coșul este gol.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Lista de produse */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 border p-4 rounded-lg shadow"
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded"
                />

                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600">{item.price} RON</p>
                  <p className="text-sm text-green-600">În stoc</p>

                  {/* Cantitate */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, +1)}
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>

                  {/* Acțiuni */}
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex items-center gap-2 text-red-600 hover:text-red-800"
                    >
                      <FaTrash /> Șterge
                    </button>

                    <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                      <FaHeart /> Salvează pentru mai târziu
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Rezumat comandă */}
          <div className="border p-6 rounded-lg shadow space-y-4">
            <h2 className="text-xl font-semibold">Rezumat comandă</h2>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{subtotal.toFixed(2)} RON</span>
            </div>

            <div className="flex justify-between">
              <span>Transport</span>
              <span>{shipping === 0 ? "Gratuit" : `${shipping} RON`}</span>
            </div>

            <div className="flex justify-between">
              <span>TVA (19%)</span>
              <span>{taxes.toFixed(2)} RON</span>
            </div>

            <hr />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{total.toFixed(2)} RON</span>
            </div>

            {/* Cod promoțional */}
            <input
              type="text"
              placeholder="Cod promoțional"
              className="w-full border p-2 rounded"
            />

            {/* Checkout */}
            <button className="w-full bg-green-600 text-white py-3 rounded-lg text-lg hover:bg-green-700 transition flex items-center justify-center gap-2">
              <FaLock />
              Finalizează comanda
            </button>

            <Link
              href="/"
              className="block text-center text-blue-600 hover:underline mt-4"
            >
              Continuă cumpărăturile
            </Link>

            {/* Elemente de încredere */}
            <div className="text-sm text-gray-600 mt-4">
              <p>✔ Plăți securizate</p>
              <p>✔ Retur gratuit 30 zile</p>
              <p>✔ Livrare rapidă</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
