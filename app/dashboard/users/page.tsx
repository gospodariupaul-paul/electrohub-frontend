import { getUsers } from "@/app/services/users";
import UsersClient from "./UsersClient";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div style={{ padding: 30 }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>Users</h1>
      <UsersClient users={users} />
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";

const API_BASE = "https://electrohub-backend.vercel.app";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/users`);
        if (res.ok) setUsers(await res.json());
      } catch (e) {
        console.error("Eroare:", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="space-y-8">

      <h1 className="text-2xl font-bold text-cyan-300">Useri</h1>

      {loading ? (
        <p className="opacity-70">Se încarcă...</p>
      ) : users.length === 0 ? (
        <p className="opacity-70">Nu există useri.</p>
      ) : (
        <ul className="space-y-3">
          {users.map((u: any) => (
            <li
              key={u.id}
              className="bg-[#070a20] border border-emerald-500/30 rounded-xl p-4 flex items-center justify-between hover:border-emerald-400 transition"
            >
              <span>{u.name || u.email}</span>
              <span className="text-xs opacity-60">{u.role}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
