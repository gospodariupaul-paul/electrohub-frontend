"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <div className="p-6 text-white space-y-6 max-w-xl mx-auto">

      <h1 className="text-3xl font-bold">Profilul meu</h1>

      <div className="bg-[#070a20] border border-white/10 p-6 rounded-xl space-y-4">

        <div>
          <p className="opacity-70 text-sm">Nume</p>
          <p className="text-lg font-semibold">
            {session?.user?.name || "Nume indisponibil"}
          </p>
        </div>

        <div>
          <p className="opacity-70 text-sm">Email</p>
          <p className="text-lg font-semibold">
            {session?.user?.email || "Email indisponibil"}
          </p>
        </div>

        <div>
          <p className="opacity-70 text-sm">Rol</p>
          <p className="text-lg font-semibold">
            {session?.user?.role || "user"}
          </p>
        </div>

      </div>

      <p className="opacity-50 text-sm">
        Aceasta este o pagină simplă de profil.  
        Dacă vrei, pot adăuga și editare profil, poză, adresă, telefon etc.
      </p>

    </div>
  );
}
