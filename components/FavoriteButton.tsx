"use client";

import { useState } from "react";
import axios from "axios";

export default function FavoriteButton({ productId, initial = false }) {
  const [fav, setFav] = useState(initial);
  const [anim, setAnim] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_URL;

  const showToast = (msg: string, type: "success" | "error") => {
    const toast = document.createElement("div");
    toast.className = `
      fixed top-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg text-white 
      text-sm shadow-lg z-[9999] transition-all duration-300
      ${type === "success" ? "bg-green-600" : "bg-red-600"}
    `;
    toast.innerText = msg;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translate(-50%, -20px)";
    }, 2000);

    setTimeout(() => toast.remove(), 2600);
  };

  const toggleFavorite = async () => {
    const newState = !fav;

    setFav(newState);
    setAnim(true);
    setTimeout(() => setAnim(false), 250);

    try {
      if (newState) {
        await axios.post(
          `${API}/favorites/${productId}`,
          {},
          { withCredentials: true }
        );
        showToast("Adăugat la favorite!", "success");
      } else {
        await axios.delete(`${API}/favorites/${productId}`, {
          withCredentials: true,
        });
        showToast("Șters din favorite!", "error");
      }
    } catch (err) {
      setFav(!newState);
      showToast("Eroare. Încearcă din nou.", "error");
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition active:scale-90"
      title={fav ? "Elimină din favorite" : "Adaugă la favorite"}
    >
      <span
        className={`inline-block transition-transform duration-300 ${
          anim ? "scale-125" : "scale-100"
        }`}
      >
        {fav ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#ff3b5c"
            viewBox="0 0 24 24"
            className="w-6 h-6 drop-shadow-[0_0_6px_#ff3b5c]"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
            4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 
            14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
            6.86-8.55 11.54L12 21.35z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="white"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M12.1 8.64l-.1.1-.11-.11C10.14 6.6 7.1 6.6 
            5.14 8.56c-1.95 1.95-1.95 5.12 0 7.07L12 
            22l6.86-6.36c1.95-1.95 1.95-5.12 0-7.07C16.9 
            6.6 13.86 6.6 12.1 8.64z" />
          </svg>
        )}
      </span>
    </button>
  );
}
