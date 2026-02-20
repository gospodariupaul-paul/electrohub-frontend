"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axiosInstance.get("/users");
        setUsers(res.data || []);
      } catch (e) {
        console.error("Eroare:", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Useri</h1>

      {loading ? (
        <p className="opacity-70">Se încarcă...</p>
      ) : users.length === 0 ? (
        <p className="opacity-70">Nu există useri.</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {users.map((u: any) => (
            <li
              key={u.id}
              className="flex items-center justify-between border-b border-white/5 pb-1"
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
