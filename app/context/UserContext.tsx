"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

const UserContext = createContext<any>(null);

export function UserProvider({ children }: any) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
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
  }, []);

  // 🔥 FIX FINAL — GOLEȘTE USERUL CÂND SE ȘTERGE CONTUL
  useEffect(() => {
    const clearUser = () => setUser(null);
    window.addEventListener("force-logout", clearUser);
    return () => window.removeEventListener("force-logout", clearUser);
  }, []);

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
