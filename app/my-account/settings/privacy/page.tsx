"use client";

import Link from "next/link";
import { FiLock, FiUserX, FiShield } from "react-icons/fi";

export default function PrivacySettings() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 text-white">

      <Link
        href="/my-account/settings"
        className="inline-block mb-6 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm"
      >
        ← Înapoi la setări
      </Link>

      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <FiShield className="w-6 h-6 text-[#00eaff]" />
        Confidențialitate
      </h1>

      <p className="text-gray-400 mb-6">
        Controlează opțiunile tale de confidențialitate, blocare utilizatori și gestionarea datelor personale.
      </p>

      <div className="space-y-8">

        {/* Blocare utilizatori */}
        <section className="bg-white/5 p-5 rounded-xl border border-white/10">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-3">
            <FiUserX className="text-[#00eaff]" />
            Utilizatori blocați
          </h2>
          <p className="text-gray-400 mb-3">
            Vezi și gestionează lista utilizatorilor pe care i-ai blocat.
          </p>
          <button className="px-4 py-2 bg-[#00eaff] text-black rounded hover:bg-[#00c7d1] transition">
            Gestionează utilizatorii blocați
          </button>
        </section>

        {/* GDPR */}
        <section className="bg-white/5 p-5 rounded-xl border border-white/10">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-3">
            <FiLock className="text-[#00eaff]" />
            Date personale (GDPR)
          </h2>
          <p className="text-gray-400 mb-3">
            Exportă sau șterge datele tale personale conform legislației GDPR.
          </p>

          <div className="flex gap-3">
            <button className="px-4 py-2 bg-[#00eaff] text-black rounded hover:bg-[#00c7d1] transition">
              Exportă datele
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
              Șterge contul
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
