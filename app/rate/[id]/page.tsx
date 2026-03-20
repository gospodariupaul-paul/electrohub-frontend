"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

export default function RateUserPage({ params }) {
  const { id: toUserId } = params;
  const { user } = useUser();
  const router = useRouter();

  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");

  const sendRating = async () => {
    if (!stars) return alert("Selectează un număr de stele!");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ratings`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        toUserId: Number(toUserId),
        stars,
        comment,
      }),
    });

    if (res.ok) {
      alert("Rating trimis cu succes!");
      router.push(`/user/${toUserId}/ratinguri`);
    } else {
      alert("Eroare la trimiterea ratingului.");
    }
  };

  return (
    <div className="min-h-screen p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Evaluează utilizatorul</h1>

      <div className="space-y-4 max-w-md">
        <div>
          <p className="mb-2">Alege numărul de stele:</p>
          <div className="flex gap-2 text-3xl">
            {[1, 2, 3, 4, 5].map((s) => (
              <span
                key={s}
                onClick={() => setStars(s)}
                className={`cursor-pointer ${
                  s <= stars ? "text-yellow-400" : "text-gray-500"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <textarea
          className="w-full p-3 bg-[#111] rounded"
          placeholder="Scrie un comentariu (opțional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          onClick={sendRating}
          className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg"
        >
          Trimite rating
        </button>
      </div>
    </div>
  );
}
