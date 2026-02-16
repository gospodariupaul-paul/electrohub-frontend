export const dynamic = "force-dynamic";

import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export function generateStaticParams() {
  return [
    { slug: "telefoane" },
    { slug: "laptopuri" },
    { slug: "smart-home" },
    { slug: "electrocasnice" },
    { slug: "audio-video" },
  ];
}

export default async function CategoryPage({ params }: { params: Promise<{ slug?: string }> }) {
  const resolvedParams = await params;

  console.log("PARAMS:", resolvedParams);

  try {
    if (!resolvedParams?.slug) {
      throw new Error("Slug is missing");
    }

    await connectDB();

    const products = await Product.find({
      category: { $regex: new RegExp(`^${resolvedParams.slug}$`, "i") }
    });

    console.log("PRODUCTS FOUND:", products.length);

    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 capitalize">
          {resolvedParams.slug.replace("-", " ")}
        </h1>

        {products.length === 0 && (
          <p className="text-gray-500">Nu există produse în această categorie.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="border p-4 rounded-lg shadow">
              <h2 className="font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.price} Lei</p>
            </div>
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
