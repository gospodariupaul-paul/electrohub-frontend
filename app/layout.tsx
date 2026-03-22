"use client";
export const dynamic = "force-dynamic";

import "./globals.css";
import { UserProvider } from "./context/UserContext";
import { NotificationProvider } from "./context/NotificationContext";
import WaitForUser from "./context/WaitForUser";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiHeart, FiHome, FiBell } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { useUser } from "./context/UserContext";
import { useNotifications } from "./context/NotificationContext";
import CookieConsent from "../components/CookieConsent";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body className="bg-[#0b141a] text-white">
        <UserProvider>
          <WaitForUser>
            <NotificationProvider>
              <Header />
              <main className="pt-4">{children}</main>
              <CookieConsent />

              {/* 🔥 FOOTER GLOBAL */}
              <footer className="border-t border-white/10 bg-black/60 mt-8">
                <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-[11px] text-white/50">
                  <div className="space-x-3">
                    <Link href="/security" className="hover:text-cyan-300">
                      Securitate
                    </Link>
                    <Link href="/warranty" className="hover:text-cyan-300">
                      Politica de garanție
                    </Link>
                    <Link href="/my-account/support" className="hover:text-cyan-300">
                      Suport Chatbot AI
                    </Link>
                  </div>
                </div>
              </footer>
            </NotificationProvider>
          </WaitForUser>
        </UserProvider>
      </body>
    </html>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const { user, loading } = useUser();
  const router = useRouter();

  const [globalSearch, setGlobalSearch] = useState("");

  const {
    getUnreadCount,
    getUserNotifications,
    markAsRead,
    deleteNotification,
    emptyState,
  } = useNotifications();

  if (loading) {
    return (
      <header className="h-16 bg-[#0d1117]/90 border-b border-white/10"></header>
    );
  }

  const unread = user ? getUnreadCount() : 0;
  const userNotifications = user ? getUserNotifications() : [];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 shadow-lg bg-[#0d1117]/90 backdrop-blur-md">
      <div className="relative pointer-events-auto max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* 🔥 HAMBURGER */}
        <div className="flex items-center gap-4">
          <div className="relative z-[9999]">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-2xl text-gray-300 hover:text-[#00eaff] transition cursor-pointer"
            >
              <FiMenu />
            </button>
          </div>

          <Link
            href="/"
            className="text-2xl font-bold tracking-wide text-[#00eaff] cursor-default"
          >
            GOSPO <span className="text-white">Electro Hub</span>
          </Link>
        </div>

        {/* 🔍 SEARCH GLOBAL FUNCȚIONAL */}
        <div className="hidden md:flex flex-1 mx-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!globalSearch.trim()) return;
              router.push(`/search?q=${encodeURIComponent(globalSearch)}`);
            }}
            className="flex items-center w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-2 shadow-inner"
          >
            <IoSearch className="text-xl text-gray-400" />

            <input
              type="text"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Caută produse, modele, categorii..."
              className="flex-1 bg-transparent outline-none text-sm text-gray-200 ml-3"
            />

            <button
              type="submit"
              className="px-4 py-1 bg-cyan-500 text-black rounded-lg text-sm font-semibold hover:bg-cyan-400 transition ml-3"
            >
              Caută
            </button>
          </form>
        </div>

        {/* 🔥 ICONIȚE */}
        <div className="flex items-center gap-5 text-xl">
          <Link href="/" className="hover:text-[#00eaff] transition">
            <FiHome />
          </Link>

          <Link
            href="/my-account/profile"
            className="hidden md:block bg-[#00eaff] text-black px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#00c7d6] transition"
          >
            Vinde
          </Link>

          <Link href="/favorites" className="hover:text-[#00eaff] transition">
            <FiHeart />
          </Link>

          {/* 🔔 CLOPOȚEL */}
          <div
            className="relative inline-block"
            onMouseLeave={() => setNotifOpen(false)}
          >
            <button
              onClick={() => {
                if (!user) {
                  window.location.href = "/login";
                  return;
                }
                setNotifOpen(!notifOpen);
              }}
              className="relative hover:opacity-80 transition"
            >
              <FiBell className="w-7 h-7 text-gray-300 hover:text-[#00eaff] transition" />

              {user && unread > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {unread}
                </span>
              )}
            </button>

            {notifOpen && user && (
              <div
                className="absolute right-0 mt-1 w-80 bg-[#0f172a] border border-white/10 rounded-xl shadow-xl p-3 z-50"
                onMouseEnter={() => setNotifOpen(true)}
              >
                <h3 className="text-lg font-semibold mb-2">Notificări</h3>

                {userNotifications.length === 0 && (
                  <div className="text-center text-gray-400 px-2 py-4">
                    <img
                      src={emptyState.image}
                      alt="Nu ai notificări"
                      className="mx-auto mb-4 w-40 h-auto opacity-90"
                    />
                    <h4 className="text-lg font-semibold text-white">
                      {emptyState.title}
                    </h4>
                    <p className="text-sm text-gray-400">{emptyState.line1}</p>
                    <p className="text-sm text-gray-400">{emptyState.line2}</p>
                  </div>
                )}

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {userNotifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3 rounded-lg flex justify-between items-center cursor-pointer ${
                        n.read
                          ? "bg-white/5"
                          : "bg-white/10 border border-cyan-500/40"
                      }`}
                    >
                      <a
                        href={n.link}
                        className="flex-1"
                        onClick={async (e) => {
                          e.preventDefault();
                          await markAsRead(n.id);
                          window.location.href = n.link;
                        }}
                      >
                        <p className={`${n.read ? "opacity-70" : "font-bold"}`}>
                          {n.text}
                        </p>
                      </a>

                      <button
                        onClick={() => deleteNotification(n.id)}
                        className="text-red-400 text-sm hover:text-red-300 ml-3"
                      >
                        Șterge
                      </button>
                    </div>
                  ))}
                </div>

                <a
                  href="/notifications/settings"
                  className="block text-center text-sm text-cyan-400 mt-3 hover:underline"
                >
                  Setări notificări
                </a>
              </div>
            )}
          </div>

          {/* 👤 PROFIL */}
          <div
            className="relative inline-block"
            onMouseLeave={() => setProfileOpen(false)}
          >
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="text-2xl transition"
              style={{ color: "white" }}
            >
              👤
            </button>

            {profileOpen && (
              <div
                className="absolute right-0 mt-1 w-56 bg-[#0f172a] border border-white/10 rounded-xl shadow-xl p-2 z-50"
                onMouseEnter={() => setProfileOpen(true)}
              >
                {!user && (
                  <>
                    <Link
                      href="/login"
                      className="block px-4 py-2 hover:bg-white/10 rounded"
                    >
                      Autentificare
                    </Link>
                    <Link
                      href="/register"
                      className="block px-4 py-2 hover:bg-white/10 rounded"
                    >
                      Creează cont
                    </Link>
                    <Link
                      href={user ? "/help" : "/login"}
                      className="block px-4 py-2 hover:bg-white/10 rounded"
                    >
                      Ajutor / Contact
                    </Link>
                  </>
                )}

                {user && (
                  <>
                    <Link
                      href="/my-account/profile"
                      className="block px-4 py-2 hover:bg-white/10 rounded"
                    >
                      Profilul meu
                    </Link>
                    <Link
                      href="/account/listings"
                      className="block px-4 py-2 hover:bg-white/10 rounded"
                    >
                      Anunțurile mele
                    </Link>
                    <Link
                      href="/my-account/profile"
                      className="block px-4 py-2 hover:bg-white/10 rounded"
                    >
                      Adaugă anunț
                    </Link>
                    <Link
                      href="/favorites"
                      className="block px-4 py-2 hover:bg-white/10 rounded"
                    >
                      Favorite
                    </Link>
                    <Link
                      href="/saved-searches"
                      className="block px-4 py-2 hover:bg-white/10 rounded"
                    >
                      Căutări salvate
                    </Link>
                    <Link
                      href="/notifications"
                      className="block px-4 py-2 hover:bg-white/10 rounded"
                    >
                      Notificări
                    </Link>
                    <Link
                      href="/my-account/settings"
                      className="block px-4 py-2 hover:bg-white/10 rounded"
                    >
                      Setări cont
                    </Link>
                    <Link
                      href="/logout"
                      className="block px-4 py-2 text-red-400 hover:bg-white/10 rounded"
                    >
                      Deconectare
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🔥 MENIU HAMBURGER */}
      {menuOpen && (
        <div
          className="bg-[#0d1117] border-t border-white/10 p-4 space-y-4"
          onMouseLeave={() => setMenuOpen(false)}
        >
          <div>
            <p className="text-xs text-gray-400 mb-1">Contul meu</p>

            <Link
              href="/my-account/profile"
              className="block py-1 text-gray-300 hover:text-[#00eaff] transition"
            >
              Profilul meu
            </Link>

            <Link
              href="/my-account/orders"
              className="block py-1 text-gray-300 hover:text-[#00eaff] transition"
            >
              Comenzile mele
            </Link>

            <Link
              href="/my-products"
              className="block py-1 text-gray-300 hover:text-[#00eaff] transition"
            >
              Produsele mele
            </Link>

            <Link
              href="/favorites"
              className="block py-1 text-gray-300 hover:text-[#00eaff] transition"
            >
              Favorite / Wishlist
            </Link>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-1">Navigare</p>

            <Link
              href="/#categories"
              className="block py-1 text-gray-300 hover:text-[#00eaff] transition"
            >
              Categorii produse
            </Link>

            <Link
              href="/my-account/profile"
              className="block py-1 text-gray-300 hover:text-[#00eaff] transition"
            >
              Adaugă anunț
            </Link>

            <Link
              href="/my-account/messages"
              className="block py-1 text-gray-300 hover:text-[#00eaff] transition"
            >
              Mesaje / Chat
            </Link>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-1">Setări & Suport</p>

            <Link
              href="/my-account/settings"
              className="block px-4 py-2 hover:bg-white/10 rounded"
            >
              Setări
            </Link>

            <Link
              href={user ? "/help" : "/login"}
              className="block py-1 text-gray-300 hover:text-[#00eaff] transition"
            >
              Ajutor / Contact / FAQ
            </Link>
          </div>

          <div className="pt-2 border-t border-white/10">
            <Link
              href="/logout"
              className="block py-1 text-red-400 hover:text-red-300 transition"
            >
              Deconectare
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
