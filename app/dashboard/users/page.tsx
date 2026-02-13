"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "@/lib/axios";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get("/users");
        setUsers(res.data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function handleDelete(id: number) {
    const confirmDelete = confirm("Sigur vrei să ștergi acest utilizator?");
    if (!confirmDelete) return;

    await axios.delete(`/users/${id}`);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  if (loading) return <p>Se încarcă...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Utilizatori</h1>

      <Link
        href="/dashboard/users/create"
        style={{
          display: "inline-block",
          marginBottom: 20,
          padding: "8px 12px",
          background: "#5cb85c",
          color: "white",
          textDecoration: "none",
        }}
      >
        Adaugă utilizator
      </Link>

      <ul>
        {users.map((user) => (
          <li key={user.id} style={{ marginBottom: 10 }}>
            <strong>{user.name}</strong> — {user.email}
            <button
              onClick={() => handleDelete(user.id)}
              style={{
                marginLeft: 10,
                background: "red",
                color: "white",
                padding: "4px 8px",
              }}
            >
              Șterge
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
