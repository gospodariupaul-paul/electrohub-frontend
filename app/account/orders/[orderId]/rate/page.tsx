"use client";

import { useState } from "react";

export default function RateOrderPage({ params }) {
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submitRating = async () => {
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/ratings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: params.orderId,
        stars,
        comment,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setMessage(data.error || "Eroare");
      return;
    }

    setMessage("Rating trimis cu succes!");
  };

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-3xl font-bold">Lasă un rating</h1>

      <div className="bg-[#111] p-6 rounded-xl border border-[#222] space-y-4">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              onClick={() => setStars(s)}
              className={`text-3xl ${
                s <= stars ? "text-yellow-400" : "text-gray-600"
              }`}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          className="w-full p-3 bg-[#222] rounded-lg"
          placeholder="Scrie un comentariu..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          onClick={submitRating}
          disabled={loading}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-semibold"
        >
          {loading ? "Se trimite..." : "Trimite rating"}
        </button>

        {message && <p className="text-gray-300">{message}</p>}
      </div>
    </div>
  );
}
