"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useUser } from "@/app/context/UserContext";

export default function UserMenu() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Închide meniul când dai click în afară
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="hover:text-[#00eaff] transition text-xl"
      >
        👤
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-56 bg-[#0f172a] border border-white/10 rounded-xl shadow-xl p-2 z-50">

          {/* 🔵 Dacă utilizatorul NU este logat */}
          {!user && (
            <>
              <Link href="/login" className="block px-4 py-2 hover:bg-white/10 rounded">
                Autentificare
              </Link>
              <Link href="/register" className="block px-4 py-2 hover:bg-white/10 rounded">
                Creează cont
              </Link>
              <Link href="/help" className="block px-4 py-2 hover:bg-white/10 rounded">
                Ajutor / Contact
              </Link>
            </>
          )}

          {/* 🟢 Dacă utilizatorul ESTE logat */}
          {user && (
            <>
              <Link href="/my-account/profile" className="block px-4 py-2 hover:bg-white/10 rounded">
                Profilul meu
              </Link>
              <Link href="/my-account/listings" className="block px-4 py-2 hover:bg-white/10 rounded">
                Anunțurile mele
              </Link>
              <Link href="/my-account/profile" className="block px-4 py-2 hover:bg-white/10 rounded">
                Adaugă anunț
              </Link>
              <Link href="/wishlist" className="block px-4 py-2 hover:bg-white/10 rounded">
                Favorite
              </Link>
              <Link href="/account/searches" className="block px-4 py-2 hover:bg-white/10 rounded">
                Căutări salvate
              </Link>
              <Link href="/notifications" className="block px-4 py-2 hover:bg-white/10 rounded">
                Notificări
              </Link>
              <Link href="/account/settings" className="block px-4 py-2 hover:bg-white/10 rounded">
                Setări cont
              </Link>

              <Link href="/logout" className="block px-4 py-2 text-red-400 hover:bg-white/10 rounded">
                Deconectare
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
