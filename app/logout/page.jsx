"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function LogoutPage() {
  useEffect(() => {
    // logica ta
  }, []);

  return (
    <div className="p-10 text-center text-white">
      <h1 className="text-3xl font-bold mb-4">Te-ai delogat</h1>
      <Link href="/" className="text-blue-400 underline">
        Înapoi la Home
      </Link>
    </div>
  );
}
