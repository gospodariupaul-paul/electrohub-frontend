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

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, reloadUser: loadUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
