"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductsList from "@/components/ProductsList";
import { FiMessageCircle } from "react-icons/fi";
import { useRouter } from "next/navigation";

Link.defaultProps = { prefetch: false };

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const [menuOpen, setMenuOpen] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("https://electrohub-backend-1-10qa.onrender.com/conversations/unread", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.count !== undefined) {
          setUnreadCount(data.count);
        }
      })
      .catch(() => {});
  }, []);

  // 🔥 AICI ESTE BUCATA MODIFICATĂ CORECT
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("https://electrohub-backend-1-10qa.onrender.com/users/online", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setOnlineUsers(res.data.length))
      .catch(() => {});
  }, []);
}

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsLogged(!!token);
    }

    axios
      .get("https://electrohub-backend-1-10qa.onrender.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Eroare la încărcarea produselor:", err));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/search?q=${encodeURIComponent(search)}`);
  };

  return (
    <>
      {/* FUNDAL ELECTRIC */}
      <div className="electro-bg">
        {Array.from({ length: 20 }).map((_, i) => (
          <img
            key={i}
            src={`/electro/e${(i % 6) + 1}.svg`}
            className="electro-item"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${6 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* VIDEO FUNDAL */}
      <div className="fixed inset-0 flex justify-center items-center pointer-events-none z-0">
        <video
          src="/earth.mp4"
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          className="earth-video"
        />
      </div>

      <div className="min-h-screen bg-[#050712]/70 backdrop-blur-sm text-white flex flex-col px-4 md:px-10 lg:px-20 relative overflow-hidden">

        {/* HEADER */}
        <header className="border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-20">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(true);
              }}
              className="text-white text-3xl mr-4 md:hidden"
            >
              ☰
            </button>

            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 via-purple-500 to-blue-600 flex items-center justify-center shadow-[0_0_25px_rgba(0,255,255,0.5)] group-hover:shadow-[0_0_40px_rgba(0,255,255,0.8)] transition-all duration-300">
                  <span className="text-3xl font-extrabold tracking-tight text-black drop-shadow-md">
                    G
                  </span>
                </div>
                <div className="absolute inset-0 rounded-2xl border border-cyan-400/50 animate-pulse blur-[1px]" />
              </div>

              <div className="flex flex-col leading-tight">
                <span className="font-bold text-2xl tracking-wide group-hover:text-cyan-300 transition">
                  GOSPO <span className="text-cyan-400">Electro</span> Hub
                </span>
                <span className="text-[12px] text-white/60">
                  Viitorul electronicii, la un click distanță
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-4 text-sm">

              {isLogged && (
                <Link href="/chat" className="relative">
                  <FiMessageCircle size={24} className="text-cyan-300" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </Link>
              )}

              {!isLogged && (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-lg border border-white/15 hover:border-cyan-400 hover:text-cyan-300 transition"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition"
                  >
                    Create account
                  </Link>
                </>
              )}

              {isLogged && (
                <Link
                  href="/logout"
                  className="px-4 py-2 rounded-lg border border-red-500/40 text-red-300 hover:bg-red-500/10 text-xs transition"
                >
                  Logout
                </Link>
              )}
            </div>

          </div>
        </header>

        {/* MENIU HAMBURGER */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setMenuOpen(false)}
          >
            <div
              className="w-72 bg-[#0b141a] h-full shadow-xl border-r border-white/10 p-5"
              onClick={(e) => e.stopPropagation()}
              onMouseLeave={() => setMenuOpen(false)}
            >
              <h3 className="text-xl font-bold mb-6">Meniu</h3>

              <div className="mb-6">
                <p className="text-xs text-white/40 mb-2">Contul meu</p>

                <Link
                  href={isLogged ? "/my-account/profile" : "/login"}
                  className="block py-2 hover:text-cyan-300"
                >
                  Profilul meu
                </Link>

                <Link
                  href={isLogged ? "/my-account/orders" : "/login"}
                  className="block py-2 hover:text-cyan-300"
                >
                  Comenzile mele
                </Link>

                <Link
                  href={isLogged ? "/my-account/products" : "/login"}
                  className="block py-2 hover:text-cyan-300"
                >
                  Produsele mele
                </Link>

                <Link
                  href={isLogged ? "/my-account/favorites" : "/login"}
                  className="block py-2 hover:text-cyan-300"
                >
                  Favorite / Wishlist
                </Link>
              </div>

              <div className="mb-6">
                <p className="text-xs text-white/40 mb-2">Navigare</p>

                <Link href="/categorii" className="block py-2 hover:text-cyan-300">
                  Categorii produse
                </Link>

                <Link
                  href={isLogged ? "/add-product" : "/login"}
                  className="block py-2 hover:text-cyan-300"
                >
                  Adaugă anunț
                </Link>

                <Link
                  href={isLogged ? "/chat" : "/login"}
                  className="block py-2 hover:text-cyan-300"
                >
                  Mesaje / Chat
                </Link>
              </div>

              <div className="mb-6">
                <p className="text-xs text-white/40 mb-2">Setări & Suport</p>

                <Link href="/settings" className="block py-2 hover:text-cyan-300">
                  Setări
                </Link>

                <Link href="/support" className="block py-2 hover:text-cyan-300">
                  Ajutor / Contact / FAQ
                </Link>
              </div>

              {isLogged && (
                <div className="pt-4 border-t border-white/10">
                  <Link
                    href="/logout"
                    className="block py-2 text-red-400 hover:text-red-300"
                  >
                    Deconectare
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
{/* MAIN CONTENT */}
<main className="flex-1 relative z-10">
  <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">

    {/* 🔥 SEARCH + CASETE (SUB VIDEO, ÎNAINTE DE CATEGORII) */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* LEFT: SEARCH BAR */}
      <form
        onSubmit={handleSearch}
        className="w-full flex flex-col md:flex-row items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-xl"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Caută produse, modele, categorii..."
          className="flex-1 bg-black/20 border border-white/10 px-4 py-2 rounded-lg text-white placeholder-white/40 outline-none"
        />

        <button
          type="submit"
          className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition"
        >
          Caută
        </button>
      </form>

      {/* RIGHT: 4 BOXES */}
      <div className="grid grid-cols-2 gap-4">

        {/* 🔥 PRODUSE ACTIVE */}
        <Link href="/produse">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center cursor-pointer hover:border-cyan-400 transition">
            <p className="text-xs text-white/50">Produse active</p>
            <p className="text-2xl font-bold text-cyan-300">{products.length}</p>
          </div>
        </Link>

        {/* 🔥 UTILIZATORI ONLINE — MODIFICAT */}
        <Link href="/utilizatori-online">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center cursor-pointer hover:border-emerald-400 transition">
            <p className="text-xs text-white/50">Utilizatori online</p>
            <p className="text-2xl font-bold text-emerald-300">{onlineUsers}</p>
          </div>
        </Link>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <p className="text-sm font-semibold">Vinde un produs</p>
          <p className="text-[11px] text-white/50">Publică un anunț rapid</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <p className="text-sm font-semibold">Categorii populare</p>
          <p className="text-[11px] text-white/50">Vezi topul</p>
        </div>

      </div>

    </div>

    {/* CATEGORII */}
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Categorii principale</h2>
        <span className="text-xs text-white/50">
          Organizare de tip bento grid, cu focus pe ce te interesează
        </span>
      </div>
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { id: 1, name: "Telefoane", slug: "telefoane" },
          { id: 2, name: "Laptopuri", slug: "laptopuri" },
          { id: 3, name: "Componente PC", slug: "componente-pc" },
          { id: 4, name: "Drones", slug: "drones" },
          { id: 5, name: "IoT & Smart Home", slug: "smart-home" },
          { id: 6, name: "Audio-Video", slug: "audio-video" },
          { id: 7, name: "Altele", slug: "altele" },
        ].map((cat) => (
          <Link
            key={cat.id}
            href={`/categorie/${cat.slug}`}
            className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-cyan-400 hover:bg-white/10 transition flex flex-col justify-between"
          >
            <div>
              <p className="text-sm font-semibold mb-1">{cat.name}</p>
              <p className="text-[11px] text-white/50">
                Explorează cele mai noi produse din categoria {cat.name}.
              </p>
            </div>

            <span className="mt-3 text-[11px] text-cyan-300">
              Vezi produsele →
            </span>
          </Link>
        ))}
      </div>
    </section>

    {/* HOT DEALS */}
    <section id="oferte" className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Top Tech Hot Deals</h2>
        <span className="text-xs text-white/50">
          Carusel 3D (placeholder)
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { id: 1, name: "Laptop UltraTech 15", price: "4999 lei", tag: "Hot Deal" },
          { id: 2, name: "Telefon X Pro 2026", price: "2999 lei", tag: "Nou" },
          { id: 3, name: "Căști Wireless Pro", price: "499 lei", tag: "Best Seller" },
        ].map((deal) => (
          <div
            key={deal.id}
            className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between"
          >
            <div>
              <p className="text-xs text-cyan-300 mb-1">{deal.tag}</p>
              <p className="text-sm font-semibold mb-1">{deal.name}</p>
              <p className="text-sm text-emerald-300">{deal.price}</p>
            </div>

            <button className="mt-3 text-xs px-3 py-1.5 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-400">
              Adaugă în coș
            </button>
          </div>
        ))}
      </div>
    </section>

    {/* AI RECOMMENDATIONS */}
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Îți recomandăm pentru setup-ul tău (AI)
        </h2>
        <span className="text-xs text-white/50">
          Bazat pe comportament, istoric și preferințe
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { id: 1, name: "Monitor 4K 144Hz", desc: "Perfect pentru gaming" },
          { id: 2, name: "Kit Smart Home", desc: "Control complet al casei" },
          { id: 3, name: "Soundbar Dolby Atmos", desc: "Cinematic audio" },
        ].map((rec) => (
          <div
            key={rec.id}
            className="bg-gradient-to-br from-white/5 to-cyan-500/5 border border-white/10 rounded-xl p-4"
          >
            <p className="text-sm font-semibold mb-1">{rec.name}</p>
            <p className="text-[12px] text-white/60 mb-2">{rec.desc}</p>

            <button className="text-[11px] px-3 py-1.5 rounded-lg border border-cyan-400 text-cyan-300 hover:bg-cyan-500/10">
              Vezi detalii
            </button>
          </div>
        ))}
      </div>
    </section>

    {/* PRODUSE REALE */}
    <section className="mt-10">
      <h2 className="text-lg font-semibold mb-4">Produse recente</h2>

      {products.length === 0 ? (
        <p className="text-white/50 text-sm">Nu există produse încă.</p>
      ) : (
        <ProductsList products={products} />
      )}
    </section>

  </div>
</main>

{/* FOOTER */}
<footer className="border-t border-white/10 bg-black/60 mt-8">
  <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-[11px] text-white/50">

    <div className="space-x-3">
      <Link href="/security" className="hover:text-cyan-300">
        Securitate
      </Link>
      <Link href="/warranty" className="hover:text-cyan-300">
        Politica de garanție
      </Link>
      <Link href="/support" className="hover:text-cyan-300">
        Suport Chatbot AI
      </Link>
    </div>

    <div className="flex gap-2">
      <button className="px-3 py-1.5 rounded-lg border border-white/15 hover:border-white/40">
        Download on App Store
      </button>
      <button className="px-3 py-1.5 rounded-lg border border-white/15 hover:border-white/40">
        Get it on Google Play
      </button>
    </div>

  </div>
</footer>

</div>
</>
);
}
