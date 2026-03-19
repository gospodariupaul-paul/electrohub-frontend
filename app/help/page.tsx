export default function HelpPage() {
  return (
    <div className="min-h-screen py-12 px-6 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white">

      {/* CARD CENTRAL COLORAT */}
      <div className="max-w-3xl mx-auto bg-purple-800/40 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20">

        {/* BUTON ÎNAPOI */}
        <a
          href="/"
          className="inline-block mb-6 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg shadow-md transition-all"
        >
          ← Înapoi
        </a>

        <h1 className="text-4xl font-extrabold mb-8 text-center drop-shadow-lg">
          Ajutor & Suport
        </h1>

        <div className="space-y-6">

          {/* CARD 1 */}
          <a
            href="/help/faq"
            className="block p-5 rounded-xl bg-blue-500/40 hover:bg-blue-500/60 transition-all shadow-lg border border-white/20"
          >
            <h2 className="text-2xl font-semibold">Întrebări frecvente (FAQ)</h2>
            <p className="text-white/90">Răspunsuri rapide la cele mai comune întrebări.</p>
          </a>

          {/* CARD 2 */}
          <a
            href="/help/contact"
            className="block p-5 rounded-xl bg-green-500/40 hover:bg-green-500/60 transition-all shadow-lg border border-white/20"
          >
            <h2 className="text-2xl font-semibold">Contact</h2>
            <p className="text-white/90">Trimite un mesaj echipei de suport.</p>
          </a>

          {/* CARD 3 */}
          <a
            href="/help/policies"
            className="block p-5 rounded-xl bg-yellow-500/40 hover:bg-yellow-500/60 transition-all shadow-lg border border-white/20"
          >
            <h2 className="text-2xl font-semibold">Politici</h2>
            <p className="text-white/90">Termeni, confidențialitate, retur și livrare.</p>
          </a>

          {/* CARD 4 */}
          <a
            href="/help/status"
            className="block p-5 rounded-xl bg-red-500/40 hover:bg-red-500/60 transition-all shadow-lg border border-white/20"
          >
            <h2 className="text-2xl font-semibold">Status servicii</h2>
            <p className="text-white/90">Verifică dacă serverele funcționează normal.</p>
          </a>

        </div>
      </div>
    </div>
  );
}
