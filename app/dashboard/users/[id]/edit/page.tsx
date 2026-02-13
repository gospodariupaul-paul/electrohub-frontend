"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { api } from "@/app/services/api";

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await api.get(`/users/${id}`);
        setName(res.data.name);
        setEmail(res.data.email);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [id]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      await api.put(`/users/${id}`, { name, email });
      router.push(`/dashboard/users/${id}`);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p>Se încarcă...</p>;

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
