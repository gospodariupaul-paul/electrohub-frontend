import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Image from "next/image";

export default async function FavoritesPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="text-center text-gray-400">
        Trebuie să fii autentificat pentru a vedea această pagină.
      </div>
    );
  }

  // 🔥 Luăm favoritele userului
  const favorites = await prisma.favorite.findMany({
    where: { userId: user.id },
    include: {
      product: true,
    },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Favorite</h1>

      {favorites.length === 0 && (
        <p className="text-gray-400">Nu ai salvat încă niciun anunț.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((fav) => (
          <div
            key={fav.id}
            className="bg-[#111] border border-[#222] rounded-xl p-4 hover:border-cyan-500 transition"
          >
            {/* Imagine */}
            <div className="w-full h-48 relative mb-4">
              <Image
                src={fav.product.images[0] || "/placeholder.png"}
                alt={fav.product.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            {/* Titlu */}
            <h2 className="text-xl font-semibold mb-2">{fav.product.title}</h2>

            {/* Preț */}
            <p className="text-cyan-400 text-lg font-bold mb-2">
              {fav.product.price} RON
            </p>

            {/* Data */}
            <p className="text-gray-500 text-sm mb-4">
              Publicat la:{" "}
              {new Date(fav.product.createdAt).toLocaleDateString("ro-RO")}
            </p>

            {/* Butoane */}
            <div className="flex gap-3">
              <a
                href={`/product/${fav.product.id}`}
                className="px-3 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-sm"
              >
                Vezi anunțul
              </a>

              <a
                href={`/account/favorites/remove/${fav.id}`}
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
