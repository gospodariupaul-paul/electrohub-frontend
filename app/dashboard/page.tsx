"use client";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#0d1224] text-white px-6 py-10">

      <h1 className="text-4xl font-bold mb-10">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <a href="/products" className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition block">
          <h2 className="text-xl font-semibold mb-2">Products</h2>
          <p className="text-gray-300">Administrează produsele tale.</p>
        </a>

        <a href="/categories" className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400/40 transition block">
          <h2 className="text-xl font-semibold mb-2">Categories</h2>
          <p className="text-gray-300">Organizează produsele pe categorii.</p>
        </a>

        <a href="/settings" className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition block">
          <h2 className="text-xl font-semibold mb-2">Settings</h2>
          <p className="text-gray-300">Setări cont și aplicație.</p>
        </a>

        <a href="/users" className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400/40 transition block">
          <h2 className="text-xl font-semibold mb-2">Users</h2>
          <p className="text-gray-300">Gestionează utilizatorii.</p>
        </a>

        <a href="/orders" className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition block">
          <h2 className="text-xl font-semibold mb-2">Orders</h2>
          <p className="text-gray-300">Monitorizează comenzile.</p>
        </a>

        <a href="/stats" className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400/40 transition block">
          <h2 className="text-xl font-semibold mb-2">Statistics</h2>
          <p className="text-gray-300">Analize și rapoarte.</p>
        </a>

      </div>
    </main>
  );
}
