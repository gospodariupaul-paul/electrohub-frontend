"use client";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0f1f] text-white px-6 py-10">

      {/* HERO */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          GOSPO Electro Hub
        </h1>

        <p className="mt-4 text-lg text-gray-300">
          Control tehnic complet într-un singur loc. Administrează produse, avatar,
          setări, comenzi, statistici și module tehnice dintr-un panou centralizat,
          rapid și intuitiv.
        </p>

        {/* HERO IMAGE */}
        <div className="mt-10 rounded-3xl overflow-hidden shadow-xl border border-white/10">
          <div className="bg-[#111827] h-64 flex items-center justify-center text-gray-400">
            <span>[ Aici poți pune o imagine tehnică / placă electronică ]</span>
          </div>
        </div>
      </section>

      {/* SEARCH BAR */}
      <div className="mt-10 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Caută funcții, module sau produse..."
          className="w-full px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-gray-200 placeholder-gray-400 focus:outline-none focus:border-cyan-400"
        />
      </div>

      {/* GRID CU MODULE */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition cursor-pointer">
          <h3 className="text-xl font-semibold mb-2">Login</h3>
          <p className="text-gray-300">Autentificare rapidă.</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400/40 transition cursor-pointer">
          <h3 className="text-xl font-semibold mb-2">Create Account</h3>
          <p className="text-gray-300">Creează un cont nou.</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition cursor-pointer">
          <h3 className="text-xl font-semibold mb-2">Dashboard</h3>
          <p className="text-gray-300">Panoul tehnic principal.</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400/40 transition cursor-pointer">
          <h3 className="text-xl font-semibold mb-2">Products</h3>
          <p className="text-gray-300">Încarcă poze și administrează produse.</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition cursor-pointer">
          <h3 className="text-xl font-semibold mb-2">Settings</h3>
          <p className="text-gray-300">Setări cont și avatar.</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400/40 transition cursor-pointer">
          <h3 className="text-xl font-semibold mb-2">Avatar Upload</h3>
          <p className="text-gray-300">Încarcă sau schimbă poza de profil.</p>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="mt-16 text-center text-gray-400 border-t border-white/10 pt-6">
        © 2026 GOSPO Electro Hub. Toate drepturile rezervate.
      </footer>

    </main>
  );
}
