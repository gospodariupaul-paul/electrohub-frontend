"use client";

import { FaSearch, FaCog, FaSignOutAlt, FaBox, FaTags, FaUser } from "react-icons/fa";

export default function DashboardPage() {
  return (
    <div className="text-white">

      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-10">

        {/* SEARCH BAR */}
        <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-4 py-3 w-full max-w-md">
          <FaSearch className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Caută produse, utilizatori, categorii..."
            className="bg-transparent outline-none text-gray-200 w-full placeholder-gray-400"
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-4 ml-6">
          <a
            href="/dashboard/settings"
            className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition border border-white/10"
          >
            <FaCog className="text-xl" />
          </a>

          <a
            href="/logout"
            className="p-3 rounded-xl bg-red-500/20 hover:bg-red-500/40 transition border border-red-500/40"
          >
            <FaSignOutAlt className="text-xl text-red-400" />
          </a>
        </div>
      </div>

      {/* TITLE */}
      <h1 className="text-4xl font-bold mb-10">Dashboard Overview</h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <DashboardCard
          href="/dashboard/products"
          icon={<FaBox className="text-3xl text-cyan-400" />}
          title="Products"
          desc="Administrează produsele tale"
        />

        <DashboardCard
          href="/dashboard/categories"
          icon={<FaTags className="text-3xl text-purple-400" />}
          title="Categories"
          desc="Organizează produsele pe categorii"
        />

        <DashboardCard
          href="/dashboard/users"
          icon={<FaUser className="text-3xl text-green-400" />}
          title="Users"
          desc="Gestionează utilizatorii"
        />

      </div>
    </div>
  );
}

function DashboardCard({ href, icon, title, desc }) {
  return (
    <a
      href={href}
      className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition block shadow-lg hover:shadow-cyan-500/20"
    >
      <div className="mb-4">{icon}</div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-300">{desc}</p>
    </a>
  );
}
