"use client";

import { useUser } from "./UserContext";

export default function WaitForUser({ children }) {
  const { loading } = useUser();

  if (loading) {
    return null; // sau un loader mic dacă vrei
  }

  return children;
}
