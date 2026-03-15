"use client";

import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function PreferencesSettings() {
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("ro");

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 text-white">
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <Cog6ToothIcon className="w-6 h-6 text-[#00eaff]" />
        Preferințe
      </h1>

      <div className="space-y-6">

        {/* TEMA */}
        <div>
          <label className="block mb-1 text-white/70">Tema aplicației</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full px-4 py-2 rounded bg-white/10 border border-white/20"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>

        {/* LIMBA */}
        <div>
          <label className="block mb-1 text-white/70">Limba</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-2 rounded bg-white/10 border border-white/20"
          >
            <option value="ro">Română</option>
            <option value="en">Engleză</option>
          </select>
        </div>

        <button className="px-6 py-2 bg-[#00eaff] text-black rounded hover:bg-[#00c7d1] transition">
          Salvează preferințele
        </button>
      </div>
    </div>
  );
}
