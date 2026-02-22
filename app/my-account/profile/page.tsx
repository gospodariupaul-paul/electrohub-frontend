"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="text-white p-6">
        <h1 className="text-xl font-bold">Trebuie să fii logat</h1>
        <p className="text-white/60 mt-2">Accesează profilul după login.</p>
      </div>
    );
  }

  return (
    <div className="text-white p-6">
      <h1 className="text-2xl font-bold">Profilul meu</h1>

      <div className="mt-4 space-y-2">
        <p><strong>Nume:</strong> {session.user.name}</p>
        <p><strong>Email:</strong> {session.user.email}</p>
      </div>
    </div>
  );
}
