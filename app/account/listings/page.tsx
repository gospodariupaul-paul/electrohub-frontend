import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Image from "next/image";

export default async function ListingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="text-center text-gray-400">
        Trebuie să fii autentificat pentru a vedea această pagină.
      </div>
    );
  }

  // Luăm toate anunțurile userului
  const listings = await prisma.product.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Anunțurile mele</h1>

      {listings.length === 0 && (
        <p className="text-gray-400">Nu ai publicat încă niciun anunț.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((item) => (
          <div
            key={item.id}
            className="bg-[#111] border border-[#222] rounded-xl p-4 hover:border-cyan-500 transition"
          >
            {/* Imagine */}
            <div className="w-full h-48 relative mb-4">
              <Image
                src={item.images[0] || "/placeholder.png"}
                alt={item.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            {/* Titlu */}
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>

            {/* Preț */}
            <p className="text-cyan-400 text-lg font-bold mb-2">
              {item.price} RON
            </p>

            {/* Data */}
            <p className="text-gray-500 text-sm mb-4">
              Publicat la: {new Date(item.createdAt).toLocaleDateString("ro-RO")}
            </p>

            {/* Butoane */}
            <div className="flex gap-3">
              <a
                href={`/edit/${item.id}`}
                className="px-3 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-sm"
              >
                Editează
              </a>

              <a
                href={`/delete/${item.id}`}
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
