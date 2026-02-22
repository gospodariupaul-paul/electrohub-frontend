"use client";

import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // dacă nu e logat → login
    const token = localStorage.getItem("token");
    if (!token || !user) {
      router.push("/login");
      return;
    }

    // dacă este admin → NU are voie aici
    if (user.role === "admin") {
      router.push("/dashboard");
      return;
    }
  }, [loading, user]);

  if (loading || !user) {
    return <div className="text-white p-10">Se încarcă...</div>;
  }

  return (
    <div className="min-h-screen bg-[#020312] text-white p-10">
      <h1 className="text-3xl font-bold mb-4">Profilul meu</h1>

      <div className="bg-[#0a0f2d] p-6 rounded-xl border border-white/10 max-w-lg">
        <p className="text-lg">
          <span className="opacity-70">Nume:</span> {user.name}
        </p>

        <p className="text-lg mt-2">
          <span className="opacity-70">Email:</span> {user.email}
        </p>

        <p className="text-lg mt-2">
          <span className="opacity-70">Rol:</span> Utilizator
        </p>
      </div>
    </div>
  );
}
