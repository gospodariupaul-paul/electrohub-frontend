"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

export default function LogoutPage() {
  const router = useRouter();
  const { setUser } = useUser();

  useEffect(() => {
    // Ștergem token-ul
    localStorage.removeItem("token");

    // Ștergem userData vechi
    localStorage.removeItem("userData");

    // Resetăm userul din context
    setUser(null);

    // Redirecționăm spre homepage
    router.push("/");
  }, []);

  return (
    <div className="text-white p-10 text-center">
      Se deloghează...
    </div>
  );
}
