export default function HelpPage() {
  return (
    <div className="min-h-screen py-12 px-6 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20">
        
        <h1 className="text-4xl font-extrabold mb-8 text-center drop-shadow-lg">
          Ajutor & Suport
        </h1>

        <div className="space-y-6">

          <a
            href="/help/faq"
            className="block p-5 rounded-xl bg-white/20 hover:bg-white/30 transition-all shadow-md"
          >
            <h2 className="text-2xl font-semibold">Întrebări frecvente (FAQ)</h2>
            <p className="text-white/90">Răspunsuri rapide la cele mai comune întrebări.</p>
          </a>

          <a
            href="/help/contact"
            className="block p-5 rounded-xl bg-white/20 hover:bg-white/30 transition-all shadow-md"
          >
            <h2 className="text-2xl font-semibold">Contact</h2>
            <p className="text-white/90">Trimite un mesaj echipei de suport.</p>
          </a>

          <a
            href="/help/policies"
            className="block p-5 rounded-xl bg-white/20 hover:bg-white/30 transition-all shadow-md"
          >
            <h2 className="text-2xl font-semibold">Politici</h2>
            <p className="text-white/90">Termeni, confidențialitate, retur și livrare.</p>
          </a>

          <a
            href="/help/status"
            className="block p-5 rounded-xl bg-white/20 hover:bg-white/30 transition-all shadow-md"
          >
            <h2 className="text-2xl font-semibold">Status servicii</h2>
            <p className="text-white/90">Verifică dacă serverele funcționează normal.</p>
          </a>

        </div>
      </div>
    </div>
  );
}
