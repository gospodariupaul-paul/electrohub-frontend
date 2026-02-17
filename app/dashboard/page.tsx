export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#050814] text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <a
        href="/dashboard/products/add"
        className="inline-block mb-6 bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-lg"
      >
        + Adaugă produs
      </a>

      <p className="opacity-70">
        Produsele vor apărea aici după ce conectăm frontend-ul la backend.
      </p>
    </div>
  );
}
