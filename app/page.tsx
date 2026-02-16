"use client";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0f1f] text-white">

      {/* HEADER */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-white/10">
        <h1 className="text-2xl font-bold tracking-tight">GOSPO Electro Hub</h1>

        <div className="flex gap-4">
          <a href="/login" className="text-gray-300 hover:text-white transition">Login</a>
          <a
            href="/register"
            className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition"
          >
            Creează cont
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="px-6 pt-16 pb-20 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          Control tehnic complet, automatizat și inteligent
        </h2>

        <p className="mt-6 text-lg text-gray-300">
          O platformă enterprise care îți centralizează produsele, utilizatorii,
          setările, comenzile și statisticile într‑un singur panou inteligent.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <a
            href="/register"
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-black font-semibold shadow-lg shadow-cyan-500/30 transition"
          >
            Înregistrează-te
          </a>

          <a
            href="/login"
            className="px-6 py-3 rounded-xl border border-gray-500 hover:border-gray-300 text-gray-300 hover:text-white transition"
          >
            Login
          </a>
        </div>

        {/* HERO VISUAL */}
        <div className="mt-14 mx-auto max-w-4xl rounded-3xl p-[2px] bg-gradient-to-r from-cyan-500/40 to-purple-500/40 backdrop-blur-xl shadow-xl">
          <div className="rounded-3xl bg-[#0d1224] p-6 h-72 flex items-center justify-center text-gray-400">
            <span>[ Screenshot / Video al aplicației ]</span>
          </div>
        </div>
      </section>

      {/* SEARCH + QUICK NAV */}
      <section className="px-6 max-w-3xl mx-auto">
        <input
          type="text"
          placeholder="Caută funcții, module sau produse..."
          className="w-full px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-gray-200 placeholder-gray-400 focus:outline-none focus:border-cyan-400"
        />

        <div className="mt-6 flex justify-around text-gray-300 text-sm">
          <a href="/dashboard" className="hover:text-white transition">Dashboard</a>
          <a href="/products" className="hover:text-white transition">Produse</a>
          <a href="/settings" className="hover:text-white transition">Setări</a>
          <a href="/users" className="hover:text-white transition">Utilizatori</a>
        </div>
      </section>

      {/* FUNCTIONALITATI – BENTO GRID */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-12">Funcționalități Principale</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition">
            <h4 className="text-xl font-semibold mb-2">Automatizare</h4>
            <p className="text-gray-300">Economisești timp cu procese automate inteligente.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400/40 transition">
            <h4 className="text-xl font-semibold mb-2">Management Produse</h4>
            <p className="text-gray-300">Organizezi, editezi și încarci produse cu AI.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition">
            <h4 className="text-xl font-semibold mb-2">Dashboard Inteligent</h4>
            <p className="text-gray-300">Statistici în timp real și alerte automate.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400/40 transition">
            <h4 className="text-xl font-semibold mb-2">Control Utilizatori</h4>
            <p className="text-gray-300">Roluri, permisiuni și securitate enterprise.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition">
            <h4 className="text-xl font-semibold mb-2">Integrare AI</h4>
            <p className="text-gray-300">Recomandări inteligente bazate pe comportament.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400/40 transition">
            <h4 className="text-xl font-semibold mb-2">Mobile Ready</h4>
            <p className="text-gray-300">Optimizat pentru orice dispozitiv.</p>
          </div>

        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="px-6 py-16 text-center">
        <h3 className="text-3xl font-bold mb-6">Încredere & Credibilitate</h3>

        <p className="text-gray-300 max-w-xl mx-auto mb-10">
          Folosit de companii din retail, logistică și tehnologie.
        </p>

        <div className="flex justify-center gap-10 opacity-70">
          <span>GDPR</span>
          <span>ISO 27001</span>
          <span>Secure Cloud</span>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-10 text-center text-gray-400 border-t border-white/10">
        © 2026 GOSPO Electro Hub. Toate drepturile rezervate.
      </footer>

    </main>
  );
}
