"use client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UtilizatoriOnlinePage() {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API_URL;

    const fetchUsers = () => {
      axios
        .get(`${API}/users/online`, { withCredentials: true })
        .then((res) => setUsers(res.data))
        .catch((err) => {
          // 🔥 Dacă userul e delogat → backend trimite 401
          if (err.response?.status === 401) {
            setUsers([]); // golește lista
          }
        });
    };

    fetchUsers();
    const interval = setInterval(fetchUsers, 3000);

    return () => clearInterval(interval);
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
