"use client";

import { useUser } from "@/app/context/UserContext";

export default function UserProfileView() {
  const { user, loading } = useUser();

  console.log("USER DATA:", user);

  if (loading) return null;

  if (!user) {
    return (
      <div className="p-6 text-white">
        <h1 className="text-xl font-bold">Trebuie să fii logat</h1>
      </div>
    );
  }

  const fullName = user.name?.trim() || "Nespecificat";
  const phone = user.phone?.trim() || "Nespecificat";
  const city = user.city?.trim() || "Nespecificat";
  const county = user.county?.trim() || "Nespecificat";
  const address = user.address?.trim() || "Nespecificat";
  const gender = user.gender?.trim() || "Nespecificat";

  let birthDate = "Nespecificată";
  if (user.birthDate) {
    const d = new Date(user.birthDate);
    if (!isNaN(d.getTime())) {
      birthDate = d.toLocaleDateString("ro-RO");
    }
  }

  let createdAt = "Nespecificat";
  if (user.createdAt) {
    const d = new Date(user.createdAt);
    if (!isNaN(d.getTime())) {
      createdAt = d.toLocaleDateString("ro-RO");
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Profilul meu</h1>

      {/* 🔙 BUTON ÎNAPOI */}
      <a
        href="/my-account/profile"
        className="inline-block mb-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
      >
        ← Înapoi
      </a>

      <div className="space-y-4 bg-[#0d1117] p-6 rounded-xl border border-white/10">

        {/* 🔥 Avatar */}
        <div className="flex items-center gap-4">
          <img
            src={user.imageUrl || user.avatarUrl || "/default-avatar.png"}
            alt="Avatar"
            className="w-20 h-20 rounded-full object-cover border border-white/20"
          />
          <div>
            <p className="text-sm opacity-70">Avatar</p>
            <p className="text-lg font-semibold">
              {user.imageUrl || user.avatarUrl ? "Setat" : "Nespecificat"}
            </p>
          </div>
        </div>

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
          <p className="text-sm opacity-70">Localitate</p>
          <p className="text-lg font-semibold">{city}</p>
        </div>

        <div>
          <p className="text-sm opacity-70">Județ</p>
          <p className="text-lg font-semibold">{county}</p>
        </div>

        <div>
          <p className="text-sm opacity-70">Adresă</p>
          <p className="text-lg font-semibold">{address}</p>
        </div>

        <div>
          <p className="text-sm opacity-70">Data nașterii</p>
          <p className="text-lg font-semibold">{birthDate}</p>
        </div>

        <div>
          <p className="text-sm opacity-70">Gen</p>
          <p className="text-lg font-semibold">{gender}</p>
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
