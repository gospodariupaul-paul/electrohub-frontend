"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UtilizatoriOnlinePage() {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("https://electrohub-backend-1-10qa.onrender.com/users/online", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => {
        console.log("Eroare la fetch:", err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#0b141a] text-white p-6">
      
      <button
        onClick={() => router.push("/")}
        className="mb-6 px-4 py-2 bg-[#00eaff] text-black rounded-lg font-semibold hover:bg-[#00c7d6] transition"
      >
        ← Înapoi la homepage
      </button>

      <h1 className="text-2xl font-bold mb-6">Utilizatori online acum</h1>

      {users.length === 0 ? (
        <p className="text-white/50">Nu este nimeni online.</p>
      ) : (
        <ul className="space-y-2">
          {users.map((u) => (
            <li
              key={u.id}
              className="bg-white/5 border border-white/10 p-3 rounded-lg"
            >
              <p className="font-semibold">{u.name}</p>
              <p className="text-white/50 text-sm">{u.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
