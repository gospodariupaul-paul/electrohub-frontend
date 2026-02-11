"use client";

import { useEffect, useState } from "react";

export default function UserDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [id]);

  if (loading) {
    return <p>Se încarcă...</p>;
  }

  if (!user) {
    return <p>Utilizatorul nu a fost găsit.</p>;
  }

  const handleDelete = async () => {
    const confirmDelete = confirm("Sigur vrei să ștergi acest utilizator?");
    if (!confirmDelete) return;

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    window.location.href = "/dashboard/users";
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Detalii utilizator</h1>

      <div
        style={{
          marginTop: 20,
          padding: 20,
          border: "1px solid #ddd",
          borderRadius: 8,
          maxWidth: 400,
        }}
      >
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Nume:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>

        <a
          href={`/dashboard/users/${user.id}/edit`}
          style={{
            display: "inline-block",
            marginTop: 20,
            marginRight: 10,
            padding: "8px 12px",
            background: "#0275d8",
            color: "white",
            textDecoration: "none",
          }}
        >
          Editează
        </a>

        <button
          onClick={handleDelete}
          style={{
            padding: "8px 12px",
            background: "#d9534f",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Șterge utilizator
        </button>
      </div>
    </div>
  );
}
