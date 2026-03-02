import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import connectDB from "@/lib/mongodb";
import SettingsForm from "./SettingsForm";
import { ObjectId } from "mongodb"; // 🔥 ADĂUGAT

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return <div className="text-gray-400">Trebuie să fii autentificat.</div>;
  }

  const mongoose = await connectDB();
  const db = mongoose.connection.db;

  // 🔥 FIX CRITIC — convertim user.id în ObjectId
  const userData = await db
    .collection("users")
    .findOne({ _id: new ObjectId(user.id) });

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Setări cont</h1>
      <SettingsForm user={userData} />
    </div>
  );
}
