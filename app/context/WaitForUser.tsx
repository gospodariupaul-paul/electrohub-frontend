"use client";

import { useUser } from "./UserContext";
import { useEffect, useState } from "react";

export default function WaitForUser({ children }) {
  const { loading, user } = useUser();
  const [forcedLogout, setForcedLogout] = useState(false);

  // 🔥 Ascultă evenimentul de ștergere cont
  useEffect(() => {
    const handler = () => setForcedLogout(true);
    window.addEventListener("force-logout", handler);
    return () => window.removeEventListener("force-logout", handler);
  }, []);

  // 🔥 Dacă userul e în proces de ștergere → nu afișăm layout-ul
  if (forcedLogout) {
    return null;
  }

  if (loading) {
    return null;
  }

  return children;
}
