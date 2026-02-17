async function getProducts() {
  try {
    const res = await fetch("https://electrohub-backend.vercel.app/products", {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return data.products || [];
  } catch (err) {
    console.error("Eroare la preluarea produselor:", err);
    return [];
  }
}

export default async function DashboardPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-[#050814] text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <a
        href="/dashboard/products/add"
        className="inline-block mb-6 bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-lg"
      >
        + Adaugă produs
      </a>

      {products.length === 0 ? (
        <p className="opacity-70">Nu există produse încă.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((p: any) => (
            <div
              key={p.id}
              className="bg-[#0b1020] border border-white/10 p-5 rounded-xl"
            >
              <h2 className="text-xl font-semibold">{p.name}</h2>
              <p className="opacity-70">{p.description}</p>
              <p className="mt-2 font-bold">{p.price} lei</p>
              <p className="text-sm opacity-50">
                {p.inStock ? "În stoc" : "Stoc epuizat"}
              </p>

              {p.image && (
                <img
                  src={p.image}
                  alt={p.name}
                  className="mt-3 rounded-lg max-h-40 object-cover"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
