export default async function CategoryPage({ params }) {
  const { slug } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/category/${slug}`,
    { cache: "no-store" }
  );

  const products = await res.json();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 capitalize">{slug}</h1>

      {products.length === 0 ? (
        <p>Nu există produse în această categorie.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
              <p className="text-gray-600">{product.price} RON</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
