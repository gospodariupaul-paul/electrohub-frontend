"use client";

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full bg-[#05070d] text-white overflow-hidden">

      {/* BACKGROUND IMAGE FULL SCREEN */}
      <img
        src="/hero-tech.jpg"
        alt="Imagine tehnică futuristă"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90"></div>

      {/* CONTENT */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6">

        {/* TITLU */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-lg">
          GOSPO Electro Hub
        </h1>

        {/* SUBTITLU */}
        <p className="mt-6 text-xl text-gray-300 max-w-2xl">
          Platformă tehnică enterprise pentru gestionarea produselor, utilizatorilor și setărilor,
          construită pentru performanță și automatizare inteligentă.
        </p>

        {/* CTA BUTTONS */}
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          <a
            href="/register"
            className="px-10 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-black font-semibold text-lg transition shadow-lg"
          >
            Creează cont
          </a>

          <a
            href="/login"
            className="px-10 py-4 rounded-xl border border-gray-400 hover:border-white text-gray-300 hover:text-white text-lg transition shadow-lg"
          >
            Login
          </a>
        </div>
      </section>

      {/* SECȚIUNE FUNCȚIONALITĂȚI */}
      <section className="relative z-10 w-full py-24 bg-[#0a0f1f] border-t border-white/10">
        <h2 className="text-4xl font-bold text-center mb-16">Funcționalități Principale</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-10 max-w-7xl mx-auto">

          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition shadow-lg">
            <h3 className="text-2xl font-semibold mb-3">Automatizare</h3>
            <p className="text-gray-300">Procese inteligente pentru eficiență maximă.</p>
          </div>

          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400/40 transition shadow-lg">
            <h3 className="text-2xl font-semibold mb-3">Management Produse</h3>
            <p className="text-gray-300">Organizezi și administrezi produse ușor.</p>
          </div>

          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition shadow-lg">
            <h3 className="text-2xl font-semibold mb-3">Dashboard Inteligent</h3>
            <p className="text-gray-300">Statistici în timp real și rapoarte avansate.</p>
          </div>

        </div>
      </section>

    </main>
  );
}
