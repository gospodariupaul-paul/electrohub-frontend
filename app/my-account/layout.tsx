"use client";

import { UserProvider, useUser } from "@/app/context/UserContext";

function ProtectedContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();

  if (loading) return null; // sau un loader

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
  return (
    <UserProvider>
      <ProtectedContent>{children}</ProtectedContent>
    </UserProvider>
  );
}
