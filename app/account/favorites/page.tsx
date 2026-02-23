import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import clientPromise from "@/lib/mongodb";
import Image from "next/image";

export default async function FavoritesPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return <div className="text-gray-400">Trebuie să fii autentificat.</div>;
  }

  const client = await clientPromise;
  const db = client.db("electrohub");

  const favorites = await db
    .collection("favorites")
    .aggregate([
      { $match: { userId: user.id } },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
    ])
    .toArray();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Favorite</h1>

      {favorites.length === 0 && (
        <p className="text-gray-400">Nu ai salvat încă niciun anunț.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((fav: any) => (
          <div
            key={fav._id}
            className="bg-[#111] border border-[#222] rounded-xl p-4 hover:border-cyan-500 transition"
          >
            <div className="w-full h-48 relative mb-4">
              <Image
                src={fav.product.images?.[0] || "/placeholder.png"}
                alt={fav.product.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            <h2 className="text-xl font-semibold mb-2">{fav.product.title}</h2>

            <p className="text-cyan-400 text-lg font-bold mb-2">
              {fav.product.price} RON
            </p>

            <div className="flex gap-3">
              <a
                href={`/product/${fav.product._id}`}
                className="px-3 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-sm"
              >
                Vezi anunțul
              </a>

              <a
                href={`/account/favorites/remove/${fav._id}`}
                className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
              >
                Șterge
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
