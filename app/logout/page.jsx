"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

export default function LogoutPage() {
  const router = useRouter();
  const { setUser } = useUser();

  useEffect(() => {
    const doLogout = async () => {
      try {
        // Trimitem logout la backend ca să marcheze userul OFFLINE
        await fetch("https://electrohub-backend-production.up.railway.app/auth/logout", {
          method: "POST",
          credentials: "include", // IMPORTANT pentru cookies
        });
      } catch (error) {
        console.log("Eroare la logout backend:", error);
      }

      // Ștergem token-urile locale
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      // Resetăm contextul
      setUser(null);

      // Redirect
      router.push("/");
    };

    doLogout();
  }, []);

  return (
    <div className="text-white p-10 text-center">
      Se deloghează...
    </div>
  );
}
