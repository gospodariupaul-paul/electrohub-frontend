import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import connectDB from "@/lib/mongodb";
import SettingsForm from "./SettingsForm";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return <div className="text-gray-400">Trebuie să fii autentificat.</div>;
  }

  const mongoose = await connectDB();
  const db = mongoose.connection.db;

  const userData = await db.collection("users").findOne({ _id: user.id });

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Setări cont</h1>
      <SettingsForm user={userData} />
    </div>
  );
}
