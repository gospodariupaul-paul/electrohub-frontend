"use client";

import { useUser } from "@/app/context/UserContext";

export default function ProfilePage() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="p-6 text-white">
        <h1 className="text-xl font-bold">Trebuie să fii logat</h1>
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold">Profilul meu</h1>

      <div className="mt-4 space-y-2">
        <p><strong>Nume:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
}
