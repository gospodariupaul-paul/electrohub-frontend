"use client";

import { useState } from "react";
import axios from "@/lib/axios";
import { Star } from "lucide-react";

export default function NewRatingPage({ params }: any) {
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async () => {
    if (stars === 0) {
      setMsg("Selectează un număr de stele.");
      return;
    }

    try {
      await axios.post("/api/ratings", {
        orderId: params.orderId,
        stars,
        comment,
      });

      setMsg("Rating trimis cu succes.");
      setStars(0);
      setComment("");
    } catch (err) {
      setMsg("A apărut o eroare la trimiterea ratingului.");
    }
  };

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-3xl font-bold">Lasă un rating</h1>

      {/* Stele */}
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={32}
            className={i <= stars ? "text-yellow-400 cursor-pointer" : "text-gray-600 cursor-pointer"}
            fill={i <= stars ? "currentColor" : "none"}
            onClick={() => setStars(i)}
          />
        ))}
      </div>

      {/* Comentariu */}
      <textarea
        className="w-full p-3 bg-[#070a20] border border-white/10 rounded-lg"
        rows={4}
        placeholder="Scrie un comentariu (opțional)..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {msg && <p className="text-cyan-400">{msg}</p>}

      <button
        onClick={submit}
        className="px-5 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold"
      >
        Trimite rating
      </button>
    </div>
  );
}
