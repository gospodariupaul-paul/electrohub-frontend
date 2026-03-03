import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import clientPromise from "@/lib/mongodb";
import NotificationItem from "./notification-item";

export default async function NotificationsPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return <div className="text-gray-400">Trebuie să fii autentificat.</div>;
  }

  const client = await clientPromise;
  const db = client.db("electrohub");

  const notifications = await db
    .collection("notifications")
    .find({ userId: user.id })
    .sort({ createdAt: -1 })
    .toArray();

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-[#0f172a] rounded-xl border border-white/10">

      {/* 🔙 BUTON ÎNAPOI */}
      <button
        onClick={() => window.history.back()}
        className="mb-6 px-4 py-2 bg-[#00eaff] text-black rounded-lg font-semibold hover:bg-[#00c7d6] transition"
      >
        ← Înapoi
      </button>

      <h1 className="text-3xl font-bold mb-6">Notificări</h1>

      {notifications.length === 0 && (
        <p className="text-gray-400">Nu ai notificări.</p>
      )}

      <div className="space-y-4">
        {notifications.map((n: any) => (
          <NotificationItem key={n._id} data={n} />
        ))}
      </div>
    </div>
  );
}
