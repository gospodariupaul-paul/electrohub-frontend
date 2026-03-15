"use client";

import { LockClosedIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function SecuritySettings() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 text-white">
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <LockClosedIcon className="w-6 h-6 text-[#00eaff]" />
        Securitate
      </h1>

      <div className="space-y-6">

        {/* PAROLA CURENTĂ */}
        <div>
          <label className="block mb-1 text-white/70">Parola actuală</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-white/10 border border-white/20"
          />
        </div>

        {/* PAROLA NOUĂ */}
        <div>
          <label className="block mb-1 text-white/70">Parola nouă</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-white/10 border border-white/20"
          />
        </div>

        <button className="px-6 py-2 bg-[#00eaff] text-black rounded hover:bg-[#00c7d1] transition">
          Schimbă parola
        </button>
      </div>
    </div>
  );
}
