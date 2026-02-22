"use client";

import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function UserProfilePage() {
  const { user, loading } = useUser();
  const router = useRouter();
  const [tab, setTab] = useState("active");

  useEffect(() => {
    const token = localStorage.getItem("token");

    // dacă nu există token → login
    if (!token) {
      router.push("/login");
      return;
    }

    // dacă încă se încarcă userul → așteptăm
    if (loading) return;

    // dacă userul nu e încă încărcat → așteptăm
    if (!user) return;

    // dacă este admin → redirect în dashboard
    if (user.role === "admin") {
      router.push("/dashboard");
      return;
    }
  }, [loading, user]);

  // dacă încă se încarcă userul → loader
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Se încarcă...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020312] text-white flex">
      {/* SIDEBAR USER */}
      <aside className="w-72 bg-[#05071a] border-r border-white/10 p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold">Contul tău</h2>
          <p className="opacity-70 text-sm">{user.email}</p>
        </div>

        <nav className="space-y-3">
          <SidebarItem label="Anunțuri" />
          <SidebarItem label="Chat" />
          <SidebarItem label="Notificări" />
          <SidebarItem label="Curier" />
          <SidebarItem label="Plăți" />
          <SidebarItem label="Ratinguri" />
          <SidebarItem label="Profil" active />
          <SidebarItem label="Setări" />
          <SidebarItem label="Livrare prin ElectroHub" />
          <SidebarItem label="Pachetele" />
        </nav>

        <div className="pt-6 border-t border-white/10">
          <SidebarItem label="Favorite" />
          <SidebarItem label="Căutări salvate" />
          <Link href="/logout" className="text-red-400 hover:text-red-300">
            Ieșire din cont
          </Link>
        </div>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Anunțurile tale</h1>

          <Link
            href="/add-product"
            className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold"
          >
            Adaugă anunț nou
          </Link>
        </div>

        {/* SOLD + CREDITE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <InfoCard title="Sold cont" value="0 €" />
          <InfoCard title="Credite disponibile" value="0 cr" />
          <InfoCard title="Pachete active" value="0" />
        </div>

        {/* TAB-URI */}
        <div className="flex gap-4 mb-6 border-b border-white/10 pb-2">
          {["active", "pending", "topay", "disabled", "moderated"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1 rounded ${
                tab === t ? "bg-cyan-600" : "bg-white/10"
              }`}
            >
              {tabLabel(t)}
            </button>
          ))}
        </div>

        {/* LISTA ANUNȚURI */}
        <div className="text-center opacity-70 py-20">
          <p>Se afișează 0 anunțuri</p>
          <p className="text-sm mt-2">
            Anunțurile active rămân aici până expiră.
          </p>

          <Link
            href="/add-product"
            className="mt-4 inline-block px-5 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg"
          >
            Publică un anunț
          </Link>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ label, active }: { label: string; active?: boolean }) {
  return (
    <div
      className={`px-3 py-2 rounded cursor-pointer ${
        active ? "bg-cyan-600" : "hover:bg-white/10"
      }`}
    >
      {label}
    </div>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-[#070a20] border border-white/10 rounded-xl p-4">
      <p className="opacity-70 text-sm">{title}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
    </div>
  );
}

function tabLabel(key: string) {
  switch (key) {
    case "active":
      return "Active";
    case "pending":
      return "În așteptare";
    case "topay":
      return "De plătit";
    case "disabled":
      return "Dezactivate";
    case "moderated":
      return "Moderate";
    default:
      return key;
  }
}
