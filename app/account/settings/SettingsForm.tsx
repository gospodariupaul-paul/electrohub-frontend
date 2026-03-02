"use client";

import { useState } from "react";
import axios from "@/lib/axios";

export default function SettingsForm({ user }: any) {
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
    avatar: user?.avatar || "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const updateField = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const save = async () => {
    setLoading(true);
    setMsg("");

    try {
      await axios.patch(`/api/users/${user._id}`, form);
      setMsg("Modificările au fost salvate.");
    } catch (err) {
      setMsg("A apărut o eroare.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-[#111] p-6 rounded-xl border border-[#222] space-y-4">
      <div>
        <label className="block mb-1 text-gray-300">Avatar</label>
        <input
          type="text"
          value={form.avatar}
          onChange={(e) => updateField("avatar", e.target.value)}
          className="w-full p-3 rounded-lg bg-[#070a20] border border-white/10"
          placeholder="URL imagine avatar"
        />
      </div>

      <div>
        <label className="block mb-1 text-gray-300">Nume</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          className="w-full p-3 rounded-lg bg-[#070a20] border border-white/10"
        />
      </div>

      <div>
        <label className="block mb-1 text-gray-300">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          className="w-full p-3 rounded-lg bg-[#070a20] border border-white/10"
        />
      </div>

      <div>
        <label className="block mb-1 text-gray-300">Telefon</label>
        <input
          type="text"
          value={form.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          className="w-full p-3 rounded-lg bg-[#070a20] border border-white/10"
        />
      </div>

      <div>
        <label className="block mb-1 text-gray-300">Localitate</label>
        <input
          type="text"
          value={form.location}
          onChange={(e) => updateField("location", e.target.value)}
          className="w-full p-3 rounded-lg bg-[#070a20] border border-white/10"
        />
      </div>

      <div>
        <label className="block mb-1 text-gray-300">Parolă nouă</label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => updateField("password", e.target.value)}
          className="w-full p-3 rounded-lg bg-[#070a20] border border-white/10"
          placeholder="Lasă gol dacă nu vrei să o schimbi"
        />
      </div>

      {msg && <p className="text-cyan-400">{msg}</p>}

      <button
        onClick={save}
        disabled={loading}
        className="px-5 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold"
      >
        {loading ? "Se salvează..." : "Salvează modificările"}
      </button>
    </div>
  );
}
