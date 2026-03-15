"use client";

import { useState } from "react";
import axiosInstance from "@/lib/axios";
import { useUser } from "@/app/context/UserContext";

export default function EditProfilePage() {
  const { user } = useUser();

  const [fullName, setFullName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    setSuccess(false);

    try {
      await axiosInstance.put(`/api/users/${user.id}`, {
        name: fullName,
        email,
        phone,
      });

      setSuccess(true);
    } catch (err) {
      console.error("Eroare la salvare:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-6">

      <h1 className="text-3xl font-bold mb-4">Editare profil</h1>
      <p className="text-gray-400 mb-6">
        Modifică numele, emailul și numărul de telefon.
      </p>

      {/* Nume complet */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300">Nume complet</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Introdu numele"
          className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-400"
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="exemplu@email.com"
          className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-400"
        />
      </div>

      {/* Telefon */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300">Telefon</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="07xx xxx xxx"
          className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-400"
        />
      </div>

      {/* Buton salvare */}
      <button
        onClick={handleSave}
        disabled={loading}
        className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-2 rounded-lg transition disabled:opacity-50"
      >
        {loading ? "Se salvează..." : "Salvează modificările"}
      </button>

      {success && (
        <p className="text-green-400 text-center mt-2">
          Modificările au fost salvate cu succes!
        </p>
      )}
    </div>
  );
}
