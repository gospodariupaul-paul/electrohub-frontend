"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

export default function LogoutPage() {
  const router = useRouter();
  const { setUser } = useUser();

  useEffect(() => {
    // Ștergem token-urile
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    // Resetăm contextul
    setUser(null);

    // Redirect fără reloadUser()
    router.push("/");
  }, []);

  return (
    <div className="text-white p-10 text-center">
      Se deloghează...
    </div>
  );
}
