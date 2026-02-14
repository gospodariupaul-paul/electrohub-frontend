"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from '@/app/services/api'

export default function CreateUserPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      await api.post("/users", { name, email, password });
      router.push("/dashboard/users");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Creare utilizator</h1>

      <form onSubmit={handleCreate} style={{ marginTop: 20, maxWidth: 400 }}>
        <label>Nume</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
          required
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
          required
        />

        <label>Parolă</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
          required
        />

        <button
          type="submit"
          disabled={saving}
          style={{
            padding: "8px 12px",
            background: "#5cb85c",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {saving ? "Se creează..." : "Creează utilizator"}
        </button>
      </form>
    </div>
  );
}
