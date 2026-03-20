"use client";

import { useUser } from "@/app/context/UserContext";

function ProtectedContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="p-6 text-white">
        Se încarcă...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 text-white">
        <h1 className="text-xl font-bold">Trebuie să fii autentificat.</h1>
      </div>
    );
  }

  return <>{children}</>;
}

export default function MyAccountLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedContent>{children}</ProtectedContent>;
}
