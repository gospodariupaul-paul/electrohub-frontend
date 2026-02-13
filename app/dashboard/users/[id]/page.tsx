"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getUserById } from "@/app/services/users";

export default function UserDetailsPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) {
      getUserById(id).then(setUser);
    }
  }, [id]);

  if (!user) {
    return <p style={{ padding: 20 }}>Utilizatorul nu a fost găsit.</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Detalii utilizator</h1>

      <div style={{ marginTop: 20 }}>
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Nume:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
}
