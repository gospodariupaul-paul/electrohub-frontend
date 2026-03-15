"use client";

import React from "react";

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-white">

      <h1 className="text-2xl font-bold mb-6">Setări cont</h1>

      {/* DATE PERSONALE */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-3">Date personale</h2>
        <div className="space-y-3 text-white/80">
          <p>Nume, email, telefon, informații de bază ale contului.</p>
          <button className="px-4 py-2 bg-[#00eaff] text-black rounded-md hover:bg-[#00c7d1] transition">
            Editează datele personale
          </button>
        </div>
      </section>

      {/* SECURITATE */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-3">Securitate</h2>
        <div className="space-y-3 text-white/80">
          <p>Schimbare parolă, activitate recentă, dispozitive conectate.</p>
          <button className="px-4 py-2 bg-[#00eaff] text-black rounded-md hover:bg-[#00c7d1] transition">
            Gestionează securitatea
          </button>
        </div>
      </section>

      {/* NOTIFICĂRI */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-3">Notificări</h2>
        <div className="space-y-3 text-white/80">
          <p>Preferințe pentru email, mesaje, alerte și activitate.</p>
          <button className="px-4 py-2 bg-[#00eaff] text-black rounded-md hover:bg-[#00c7d1] transition">
            Setări notificări
          </button>
        </div>
      </section>

      {/* PREFERINȚE */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-3">Preferințe</h2>
        <div className="space-y-3 text-white/80">
          <p>Temă, limbă, preferințe de afișare.</p>
          <button className="px-4 py-2 bg-[#00eaff] text-black rounded-md hover:bg-[#00c7d1] transition">
            Modifică preferințele
          </button>
        </div>
      </section>

    </div>
  );
}
