"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useUser } from "@/app/context/UserContext";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  imageUrl?: string;
  role?: string;
  description?: string;
}

export default function ProfilePage() {
  const { user } = useUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!user) return;

    axiosInstance
      .get(`/api/users/${user.id}`)
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Eroare la încărcare profil:", err));
  }, [user]);

  if (!profile) {
    return (
      <p className="text-center mt-10 text-gray-400">
        Se încarcă profilul...
      </p>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Profilul meu</h1>

      <div className="bg-[#0f172a] p-6 rounded-xl border border-white/10 space-y-6">

        {/* Avatar + nume */}
        <div className="text-center space-y-3">
          <img
            src={profile.imageUrl || "https://via.placeholder.com/150"}
            alt="Avatar"
            className="w-28 h-28 rounded-full mx-auto object-cover border border-white/20"
          />
          <h2 className="text-2xl font-semibold text-white">{profile.name}</h2>
          <p className="text-gray-400">{profile.role || "Utilizator"}</p>
        </div>

        {/* Informații */}
        <div className="space-y-4">
          <InfoItem label="Email" value={profile.email} />
          <InfoItem label="Telefon" value={profile.phone || "Nespecificat"} />
          <InfoItem label="Adresă" value={profile.address || "Nespecificat"} />
          <InfoItem label="Oraș" value={profile.city || "Nespecificat"} />
          <InfoItem label="Țară" value={profile.country || "Nespecificat"} />
          <InfoItem label="Descriere" value={profile.description || "Nicio descriere"} />
        </div>
      </div>
    </div>
  );
}

interface InfoItemProps {
  label: string;
  value: string;
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className="flex justify-between border-b border-white/10 pb-2">
      <span className="text-gray-400">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  );
}
