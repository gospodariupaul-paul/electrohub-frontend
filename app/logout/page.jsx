"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

export default function LogoutPage() {
  const router = useRouter();
  const { setUser, reloadUser } = useUser();

  useEffect(() => {
    // Ștergem token-urile
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");

    // Ștergem user-ul
    localStorage.removeItem("user");

    // Resetăm contextul
    setUser(null);
    reloadUser(); // 🔥 OBLIGATORIU

    // Redirecționăm
    router.push("/");
  }, []);

  return (
    <div className="text-white p-10 text-center">
      Se deloghează...
    </div>
  );
}
