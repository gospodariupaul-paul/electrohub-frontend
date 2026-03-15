"use client";

import { UserIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function ProfileSettings() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 text-white">
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <UserIcon className="w-6 h-6 text-[#00eaff]" />
        Editare profil
      </h1>

      <div className="space-y-6">

        {/* NUME */}
        <div>
          <label className="block mb-1 text-white/70">Nume complet</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded bg-white/10 border border-white/20"
            placeholder="Introdu numele"
          />
        </div>

        {/* TELEFON */}
        <div>
          <label className="block mb-1 text-white/70">Telefon</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 rounded bg-white/10 border border-white/20"
            placeholder="07xx xxx xxx"
          />
        </div>

        <button className="px-6 py-2 bg-[#00eaff] text-black rounded hover:bg-[#00c7d1] transition">
          Salvează modificările
        </button>
      </div>
    </div>
  );
}
