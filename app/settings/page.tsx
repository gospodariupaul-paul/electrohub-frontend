"use client";

import { useState } from "react";

export default function Settings() {
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);

  function handleAvatar(e) {
    const file = e.target.files[0];
    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold mb-8">Settings</h1>

      <div className="bg-white/10 p-8 rounded-2xl border border-white/20 max-w-xl">

        <h2 className="text-2xl font-semibold mb-4">Avatar</h2>

        <div className="flex items-center gap-6">

          {/* PREVIEW AVATAR */}
          <div className="w-32 h-32 rounded-full bg-white/10 border border-white/20 overflow-hidden">
            {preview ? (
              <img src={preview} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full opacity-40">
                Nicio poză
              </div>
            )}
          </div>

          {/* INPUT UPLOAD */}
          <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold">
            Încarcă poză
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
          </label>
        </div>

        <p className="opacity-60 mt-4 text-sm">
          Poza este doar previzualizată. Dacă vrei, pot să o fac să se salveze în baza de date.
        </p>
      </div>
    </main>
  );
}
