import Link from "next/link";
"use client";

import { useEffect } from "react";

export default function LogoutPage() {
  useEffect(() => {
    // Ștergem cookie-urile
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    document.cookie = "refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";

    // Redirect către login
    window.location.href = "/login";
  }, []);

  return <p>Se face logout...</p>;
}
