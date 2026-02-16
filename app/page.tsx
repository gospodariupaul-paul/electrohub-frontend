"use client";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0f1f] to-[#111827] text-white">

      {/* HERO SECTION */}
      <section className="px-6 pt-20 pb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          GOSPO Electro Hub
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Control tehnic complet, automatizat și inteligent pentru afacerea ta.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-black font-semibold shadow-lg shadow-cyan-500/30 transition">
            Începe Gratuit
          </button>

          <button className="px-6 py-3 rounded-xl border border-gray-500 hover:border-gray-300 text-gray-300 hover:text-white transition">
            Vezi Demo
          </button>
        </div>

        {/* HERO VISUAL */}
        <div className="mt-12 mx-auto max-w-4xl rounded-3xl p-1 bg-gradient-to-r from-cyan-500/40 to-purple-500/40 backdrop-blur-xl shadow-xl">
          <div className="rounded-3xl bg-[#0d1224] p-6 h-64 flex items-center justify-center text-gray-400">
            <span className="text-lg">[ Aici poți pune un screenshot / animație ]</span>
          </div>
        </div>
      </section>

      {/* BENTO GRID – FUNCTIONALITATI */}
      <section className="px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Funcționalități Principale</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 transition">
            <h3 className="text-xl font-semibold mb-2">Automatizare</h3>
            <p className="text-gray-300">Procese automate care reduc timpul de lucru cu 60%.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-400/40 transition">
            <h3 className="text-xl font-semibold mb-2">Management Produse</h3>
            <p className="text-gray-300">Încarcă, editează și organizează produse cu AI.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 transition">
            <h3 className="text-xl font-semibold mb-2">Dashboard Inteligent</h3>
            <p className="text-gray-300">Indicatori în timp real, alerte și rapoarte.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-400/40 transition">
            <h3 className="text-xl font-semibold mb-2">Control Utilizatori</h3>
            <p className="text-gray-300">Roluri, permisiuni și securitate avansată.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 transition">
            <h3 className="text-xl font-semibold mb-2">Integrare AI</h3>
            <p className="text-gray-300">Recomandări inteligente bazate pe comportament.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-400/40 transition">
            <h3 className="text-xl font-semibold mb-2">Mobile Ready</h3>
            <p className="text-gray-300">Optimizat pentru orice dispozitiv.</p>
          </div>

        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Încredere & Credibilitate</h2>

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
        <p>© 2026 GOSPO Electro Hub. Toate drepturile rezervate.</p>
      </footer>

    </main>
  );
}
