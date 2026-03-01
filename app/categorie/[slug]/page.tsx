import Link from "next/link";
export const dynamic = "force-dynamic";

import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

// Slug → Nume categorie din baza de date
const categoryMap: Record<string, string> = {
  "telefoane": "Telefoane",
  "laptopuri": "Laptopuri",
  "componente-pc": "Componente PC",
  "drones": "Drones",
  "smart-home": "IoT & Smart Home",
  "audio-video": "Audio-Video",
};

export function generateStaticParams() {
  return Object.keys(categoryMap).map((slug) => ({ slug }));
}

export default async function CategoryPage({ params }: { params: { slug?: string } }) {
  const { slug } = params;

  try {
    if (!slug) {
      throw new Error("Slug is missing");
    }

    const categoryName = categoryMap[slug];

    if (!categoryName) {
      throw new Error("Categoria nu există");
    }

    await connectDB();

    // Căutăm produsele după numele categoriei din DB, nu după slug
    const products = await Product.find({
      category: { $regex: new RegExp(`^${categoryName}$`, "i") }
    });

    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 capitalize">
          {categoryName}
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
              <p className="text-gray-600">{product.price} Lei</p>
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
