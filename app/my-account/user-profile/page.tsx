"use client";

import { useUser } from "@/app/context/UserContext";

export default function UserProfileView() {
  const { user, loading } = useUser();

  // 🔥 Logăm user-ul în consolă ca să vedem ce date vin
  console.log("USER DATA:", user);

  if (loading) return null;

  if (!user) {
    return (
      <div className="p-6 text-white">
        <h1 className="text-xl font-bold">Trebuie să fii logat</h1>
      </div>
    );
  }

  // 🔥 Asigurăm date valide
  const fullName =
    user.name && user.name.trim() !== "" ? user.name : "Nespecificat";

  const phone =
    user.phone && user.phone.trim() !== "" ? user.phone : "Nespecificat";

  // 🔥 Formatăm data în siguranță
  let createdAt = "Nespecificat";
  if (user.createdAt) {
    const date = new Date(user.createdAt);
    if (!isNaN(date.getTime())) {
      createdAt = date.toLocaleDateString("ro-RO");
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Profilul meu</h1>

      <div className="space-y-4 bg-[#0d1117] p-6 rounded-xl border border-white/10">

        <div>
          <p className="text-sm opacity-70">Nume complet</p>
          <p className="text-lg font-semibold">{fullName}</p>
        </div>

        <div>
          <p className="text-sm opacity-70">Email</p>
          <p className="text-lg font-semibold">{user.email}</p>
        </div>

        <div>
          <p className="text-sm opacity-70">Telefon</p>
          <p className="text-lg font-semibold">{phone}</p>
        </div>

        <div>
          <p className="text-sm opacity-70">Creat la</p>
          <p className="text-lg font-semibold">{createdAt}</p>
        </div>

      </div>

      <a
        href="/my-account/settings/profile"
        className="inline-block mt-6 px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold"
      >
        Editează profilul
      </a>
    </div>
  );
}
