import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import clientPromise from "@/lib/mongodb";
import RatingItem from "./rating-item";
import { Star } from "lucide-react";

export default async function RatingsPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return <div className="text-gray-400">Trebuie să fii autentificat.</div>;
  }

  const client = await clientPromise;
  const db = client.db("electrohub");

  const ratings = await db
    .collection("ratings")
    .aggregate([
      { $match: { userId: user.id } },
      {
        $lookup: {
          from: "users",
          localField: "fromUserId",
          foreignField: "_id",
          as: "fromUser",
        },
      },
      { $unwind: "$fromUser" },
    ])
    .sort({ createdAt: -1 })
    .toArray();

  const avg =
    ratings.length > 0
      ? (ratings.reduce((a: number, r: any) => a + r.stars, 0) / ratings.length).toFixed(1)
      : 0;

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold">Ratinguri</h1>

      {/* Rezumat rating */}
      <div className="bg-[#111] p-6 rounded-xl border border-[#222] flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Star className="text-yellow-400" size={40} />
          <span className="text-4xl font-bold">{avg}</span>
        </div>

        <div className="text-gray-400">
          <p>{ratings.length} evaluări</p>
        </div>
      </div>

      {/* Lista ratinguri */}
      {ratings.length === 0 && (
        <p className="text-gray-400">Nu ai primit încă nicio evaluare.</p>
      )}

      <div className="space-y-4">
        {ratings.map((r: any) => (
          <RatingItem key={r._id} data={r} />
        ))}
      </div>
    </div>
  );
}
