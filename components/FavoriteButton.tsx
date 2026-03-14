"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function FavoriteButton({ productId, initial = false }) {
  const [fav, setFav] = useState(initial);

  const API = process.env.NEXT_PUBLIC_API_URL;

  const toggleFavorite = async () => {
    setFav(!fav); // optimistic UI

    try {
      if (!fav) {
        await axios.post(
          `${API}/favorites/${productId}`,
          {},
          { withCredentials: true }
        );
      } else {
        await axios.delete(`${API}/favorites/${productId}`, {
          withCredentials: true,
        });
      }
    } catch (err) {
      setFav(fav); // revert dacă apare eroare
    }
  };

  return (
    <motion.button
      onClick={toggleFavorite}
      whileTap={{ scale: 0.85 }}
      className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition"
      title={fav ? "Elimină din favorite" : "Adaugă la favorite"}
    >
      <motion.span
        animate={{ scale: fav ? 1.2 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {fav ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#ff3b5c"
            viewBox="0 0 24 24"
            className="w-6 h-6"
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
      </motion.span>
    </motion.button>
  );
}
