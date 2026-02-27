"use client";

import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext<any>(null);

export function UserProvider({ children }: any) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = () => {
    try {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        console.log("USER LOGAT:", parsedUser);
        setUser(parsedUser);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Failed to load user from localStorage:", err);
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();

    // ASCULTĂ SCHIMBĂRILE DIN LOCALSTORAGE ÎN ACELAȘI TAB
    const interval = setInterval(() => {
      loadUser();
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
