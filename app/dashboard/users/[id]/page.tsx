"use client";

import { useEffect, useState } from "react";
import { api } from "@/app/services/api";
import Link from "next/link";

export default function UserDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await api.get(`/users/${id}`);
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [id]);

  async function handleDelete() {
    const confirmDelete = confirm("Sigur vrei să ștergi acest utilizator?");
    if (!confirmDelete) return;

    await api.delete(`/users/${id}`);
    window.location.href = "/dashboard/users";
  }

  if (loading) return <p>Se încarcă...</p>;
  if (!user) return <p>Utilizatorul nu a fost găsit.</p>;

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

        <Link
          href={`/dashboard/users/${user.id}/edit`}
          style={{
            display: "inline-block",
            marginTop: 20,
            marginRight: 10,
            padding: "8px 12