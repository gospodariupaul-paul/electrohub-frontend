import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import connectDB from "@/lib/mongodb";
import { ObjectId } from "mongodb"; // 🔥 ADĂUGAT

export default async function SavedSearchesPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return <div className="text-gray-400">Trebuie să fii autentificat.</div>;
  }

  const mongoose = await connectDB();
  const db = mongoose.connection.db;

  // 🔥 FIX CRITIC — convertim user.id în ObjectId
  const searches = await db
    .collection("saved_searches")
    .find({ userId: new ObjectId(user.id) })
    .sort({ createdAt: -1 })
    .toArray();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Căutări salvate</h1>

      {searches.length === 0 && (
        <p className="text-gray-400">Nu ai salvat încă nicio căutare.</p>
      )}

      <div className="space-y-4">
        {searches.map((s: any) => (
          <div
            key={s._id}
            className="bg-[#111] border border-[#222] rounded-xl p-4 flex justify-between items-center hover:border-cyan-500 transition"
          >
            <div>
              <p className="text-lg font-semibold">{s.query}</p>
              <p className="text-gray-400 text-sm">
                {new Date(s.createdAt).toLocaleDateString("ro-RO")}
              </p>
            </div>

            <div className="flex gap-3">
              <a
                href={`/search?${s.queryString}`}
                className="px-3 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-sm"
              >
                Caută din nou
              </a>

              <a
                href={`/account/searches/remove/${s._id}`}
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
