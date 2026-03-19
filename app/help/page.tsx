export default function HelpPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Ajutor & Suport</h1>

      <div className="space-y-4">
        <a href="/help/faq" className="block p-4 border rounded-lg hover:bg-gray-50">
          <h2 className="text-xl font-semibold">Întrebări frecvente (FAQ)</h2>
          <p className="text-gray-600">Răspunsuri rapide la cele mai comune întrebări.</p>
        </a>

        <a href="/help/contact" className="block p-4 border rounded-lg hover:bg-gray-50">
          <h2 className="text-xl font-semibold">Contact</h2>
          <p className="text-gray-600">Trimite un mesaj echipei de suport.</p>
        </a>

        <a href="/help/policies" className="block p-4 border rounded-lg hover:bg-gray-50">
          <h2 className="text-xl font-semibold">Politici</h2>
          <p className="text-gray-600">Termeni, confidențialitate, retur și livrare.</p>
        </a>

        <a href="/help/status" className="block p-4 border rounded-lg hover:bg-gray-50">
          <h2 className="text-xl font-semibold">Status servicii</h2>
          <p className="text-gray-600">Verifică dacă serverele funcționează normal.</p>
        </a>
      </div>
    </div>
  );
}
