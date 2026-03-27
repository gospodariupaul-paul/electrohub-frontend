"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

const UserContext = createContext<any>(null);

export function UserProvider({ children }: any) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [forcedLogout, setForcedLogout] = useState(false);

  // 🔥 Ascultă evenimentul de ștergere cont
  useEffect(() => {
    const handler = () => {
      setForcedLogout(true);
      setUser(null);
      setLoading(false);
    };

    window.addEventListener("force-logout", handler);
    return () => window.removeEventListener("force-logout", handler);
  }, []);

  const loadUser = async () => {
    // 🔥 Dacă tocmai am șters contul → NU mai încărcăm userul
    if (forcedLogout) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.get("/auth/me");
      setUser(res.data);
      console.log("USER LOGAT (REAL):", res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    }

    setUser(null);
  };

  useEffect(() => {
    loadUser();
  }, [forcedLogout]); // 🔥 dacă forcedLogout devine true → NU mai rulăm loadUser

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        reloadUser: loadUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
