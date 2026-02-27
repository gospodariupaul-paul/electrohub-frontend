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
    localStorage.removeItem("user");

    // Resetăm contextul
    setUser(null);

    // 🔥 IMPORTANT: așteptăm ca React să proceseze setUser(null)
    setTimeout(() => {
      reloadUser(); // acum se execută SIGUR
      console.log("USER LOGAT după logout:", null);
      router.push("/");
    }, 50);
  }, []);

  return (
    <div className="text-white p-10 text-center">
      Se deloghează...
    </div>
  );
}
