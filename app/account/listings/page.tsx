import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import clientPromise from "@/lib/mongodb";
import Image from "next/image";

export default async function ListingsPage() {
  // 🔥 Luăm userul logat prin NextAuth
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return <div className="text-gray-400">Trebuie să fii autentificat.</div>;
  }

  // 🔥 Conectare la MongoDB
  const client = await clientPromise;
  const db = client.db("electrohub");

  // 🔥 Luăm produsele userului
  const listings = await db
    .collection("products")
    .find({ userId: user.id })
    .sort({ createdAt: -1 })
    .toArray();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Anunțurile mele</h1>

      {listings.length === 0 && (
        <p className="text-gray-400">Nu ai publicat încă niciun anunț.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((item: any) => (
          <div
            key={item._id}
            className="bg-[#111] border border-[#222] rounded-xl p-4 hover:border-cyan-500 transition"
          >
            <div className="w-full h-48 relative mb-4">
              <Image
                src={item.images?.[0] || "/placeholder.png"}
                alt={item.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>

            <p className="text-cyan-400 text-lg font-bold mb-2">
              {item.price} RON
            </p>

            <p className="text-gray-500 text-sm mb-4">
              Publicat la: {new Date(item.createdAt).toLocaleDateString("ro-RO")}
            </p>

            <div className="flex gap-3">
              <a
                href={`/edit/${item._id}`}
                className="px-3 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-sm"
              >
                Editează
              </a>

              <a
                href={`/delete/${item._id}`}
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
