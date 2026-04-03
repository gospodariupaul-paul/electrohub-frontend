export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white px-6">
      <h1 className="text-4xl font-bold mb-4">Comanda ta a fost plasată!</h1>

      <p className="text-gray-300 text-lg mb-8 text-center max-w-xl">
        Îți mulțumim pentru comandă. Poți vedea detaliile în secțiunea „Comenzile mele”.
      </p>

      <a
        href="/my-account/orders"
        className="px-6 py-3 bg-[#00eaff] text-black rounded-lg font-semibold hover:bg-[#00c7d1] transition"
      >
        Vezi comenzile mele
      </a>
    </div>
  );
}
