import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import clientPromise from "@/lib/mongodb";
import Image from "next/image";

export default async function ProfilePage() {
  // 🔥 Luăm userul logat prin NextAuth
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return <div className="text-gray-400">Trebuie să fii autentificat.</div>;
  }

  // 🔥 Conectare la MongoDB
  const client = await clientPromise;
  const db = client.db("electrohub");

  // 🔥 Luăm datele complete ale userului din DB
  const userData = await db
    .collection("users")
    .findOne({ _id: user.id });

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Profilul meu</h1>

      <div className="bg-[#111] p-6 rounded-xl border border-[#222]">
        <div className="flex items-center gap-6">

          {/* Avatar */}
          <div className="w-28 h-28 relative">
            <Image
              src={userData?.avatar || "/default-avatar.png"}
              alt="Avatar"
              fill
              className="rounded-full object-cover border border-[#333]"
            />
          </div>

          {/* Date utilizator */}
          <div className="space-y-1">
            <p className="text-xl font-semibold">
              {userData?.name || "Fără nume"}
            </p>

            <p className="text-gray-400">{user.email}</p>

            <p className="text-gray-400">
              {userData?.phone || "Telefon neadăugat"}
            </p>

            <p className="text-gray-400">
              {userData?.location || "Localitate neadăugată"}
            </p>
          </div>
        </div>

        {/* Buton editare */}
        <div className="mt-6">
          <a
            href="/account/settings"
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-sm font-semibold"
          >
            Editează profilul
          </a>
        </div>
      </div>
    </div>
  );
}
