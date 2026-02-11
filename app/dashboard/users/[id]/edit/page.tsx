"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditUserPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
        setName(data.name);
        setEmail(data.email);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [id]);

  const handleSave = async (e: any) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email }),
      });

      router.push(`/dashboard/users/${id}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p>Se încarcă...</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Editare utilizator</h1>

      <form onSubmit={handleSave} style={{ marginTop: 20, maxWidth: 400 }}>
        <label>Nume</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <button
          type="submit"
          disabled={saving}
          style={{
            padding: "8px 12px",
            background: "#0275d8",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {saving ? "Se salvează..." : "Salvează"}
        </button>
      </form>
    </div>
  );
}
