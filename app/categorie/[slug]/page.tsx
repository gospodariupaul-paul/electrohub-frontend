import Link from "next/link";
export const dynamic = "force-dynamic";

import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

// Slug-urile reale din baza ta de date
const validCategories = [
  "telefoane",
  "laptopuri",
  "componente-pc",
  "audio-video",
];

export function generateStaticParams() {
  return validCategories.map((slug) => ({ slug }));
}

export default async function CategoryPage({ params }: { params: { slug?: string } }) {
  const { slug } = params;

  try {
    if (!slug || !validCategories.includes(slug)) {
      throw new Error("Categoria nu există");
    }

    await connectDB();

    // Căutăm direct categoria EXACT cum este în DB
    const products = await Product.find({
      category: { $regex: new RegExp(`^${slug}$`, "i") }
    });

    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 capitalize">
          {slug.replace("-", " ")}
        </h1>

        {products.length === 0 && (
          <p className="text-gray-500">Nu există produse în această categorie.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/product/${product._id}`}
              className="border p-4 rounded-lg shadow hover:border-cyan-400 transition"
            >
              <h2 className="font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.price} €</p>
            </Link>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Category page error:", error);

    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Categorie</h1>
        <p className="text-red-500">A apărut o eroare la încărcarea categoriei.</p>
      </div>
    );
  }
}
