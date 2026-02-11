"use client";

import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setUsers(data);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  if (loading) {
    return <p>Se încarcă utilizatorii...</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Utilizatori</h1>

      <a
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
      </a>

      {users.length === 0 && <p>Nu există utilizatori.</p>}

      <ul style={{ marginTop: 20 }}>
        {users.map((user) => (
          <li key={user.id} style={{ marginBottom: 10 }}>
            <a
              href={`/dashboard/users/${user.id}`}
              style={{ color: "#0275d8", textDecoration: "none" }}
            >
              {user.name} – {user.email}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
