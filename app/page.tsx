"use client";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0b0f19] text-white">

      {/* HERO */}
      <section className="px-6 pt-20 pb-16 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          GOSPO Electro Hub
        </h1>

        <p className="mt-4 text-lg text-gray-300">
          Platformă tehnică modernă pentru gestionarea produselor, utilizatorilor și setărilor.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/register"
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-black font-semibold transition"
          >
            Creează cont
          </a>

          <a
            href="/login"
            className="px-6 py-3 rounded-xl border border-gray-500 hover:border-gray-300 text-gray-300 hover:text-white transition"
          >
            Login
          </a>
        </div>

        {/* HERO IMAGE */}
        <div className="mt-12 mx-auto max-w-4xl rounded-3xl overflow-hidden border border-white/10 shadow-xl">
          <img
            src="/hero-tech.jpg"
            alt="Imagine tehnică"
            className="w-full h-72 object-cover opacity-80"
          />
        </div>
      </section>

      {/* SEARCH */}
      <section className="px-6 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Caută funcții, module sau produse..."
          className="w-full px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-gray-200 placeholder-gray-400 focus:outline-none focus:border-cyan-400"
        />
      </section>

      {/* FUNCTIONALITATI */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Funcționalități Principale</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-semibold mb-2">Automatizare</h3>
            <p className="text-gray-300">Procese automate pentru eficiență maximă.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-semibold mb-2">Management Produse</h3>
            <p className="text-gray-300">Organizezi și administrezi produse ușor.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-semibold mb-2">Dashboard Inteligent</h3>
            <p className="text-gray-300">Statistici în timp real și rapoarte.</p>
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
        © 2026 GOSPO Electro Hub. Toate drepturile rezervate.
      </footer>

    </main>
  );
}
