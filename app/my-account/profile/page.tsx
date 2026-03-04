"use client";

import { useUser } from "@/app/context/UserContext";
import { useNotifications } from "@/app/context/NotificationContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function UserProfilePage() {
  const { user, loading } = useUser();
  const { getUnreadCount } = useNotifications();
  const router = useRouter();

  const [tab, setTab] = useState("active");
  const [products, setProducts] = useState([]);

  // 🔥 Slider index pentru fiecare produs
  const [sliderIndex, setSliderIndex] = useState<any>({});

  // 🔥 Mesaje necitite
  const [unreadCount, setUnreadCount] = useState(0);

  // 🔥 Notificări necitite
  const notificationCount = user ? getUnreadCount(user.id) : 0;

  // 🔥 Fetch mesaje necitite
  useEffect(() => {
    if (!user || !user.id) return;

    const fetchUnread = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/conversations/user/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        const total = data.reduce(
          (sum: number, conv: any) => sum + (conv.unreadCount || 0),
          0
        );

        setUnreadCount(total);
      } catch (err) {
        console.error("Eroare la fetch unread:", err);
      }
    };

    fetchUnread();
  }, [user]);

  const handleDelete = async (id: number) => {
    if (!confirm("Sigur vrei să ștergi acest anunț?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        console.error("Eroare la ștergere");
        return;
      }

      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Eroare la ștergere:", err);
    }
  };

  useEffect(() => {
    if (!user || !user.id) return;

    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/user/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Eroare la fetch produse:", err);
      }
    };

    fetchProducts();
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    if (loading) return;
    if (!user) return;

    if (user.role === "admin") {
      router.push("/dashboard");
      return;
    }
  }, [loading, user]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Se încarcă...
      </div>
    );
  }

  const activeCount = products.filter((p: any) => p.status === "active").length;
  const pendingCount = products.filter((p: any) => p.status === "pending").length;
  const toPayCount = products.filter((p: any) => p.status === "topay").length;
  const disabledCount = products.filter((p: any) => p.status === "disabled").length;
  const moderatedCount = products.filter((p: any) => p.status === "moderated").length;

  const now = new Date();

  const productsWithExpiry = products.map((p: any) => {
    const created = new Date(p.createdAt);
    const diffDays =
      (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);

    return {
      ...p,
      expiresSoon: diffDays >= 29 && diffDays < 30,
      expired: diffDays >= 30,
    };
  });

  return (
    <div className="min-h-screen bg-[#020312] text-white flex">
      {/* SIDEBAR */}
      <aside className="w-72 bg-[#05071a] border-r border-white/10 p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold">Contul tău</h2>
          <p className="opacity-70 text-sm">{user.email}</p>
        </div>

        <nav className="space-y-3">
          <SidebarItem label="Anunțuri" active />

          {/* 🔥 CHAT CU BADGE */}
          <Link href="/my-account/messages" className="relative block">
            <SidebarItem label="Chat" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </Link>

          {/* 🔥 NOTIFICĂRI CU BADGE */}
          <Link href="/my-account/notifications" className="relative block">
            <SidebarItem label="Notificări" />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                {notificationCount}
              </span>
            )}
          </Link>

          <SidebarItem label="Curier" />
          <SidebarItem label="Plăți" />
          <SidebarItem label="Ratinguri" />
          <SidebarItem label="Profil" />
          <SidebarItem label="Setări" />
        </nav>

        <div className="pt-6 border-t border-white/10">
          <SidebarItem label="Favorite" />
          <SidebarItem label="Căutări salvate" />
          <Link href="/logout" className="text-red-400 hover:text-red-300">
            Ieșire din cont
          </Link>
        </div>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-10">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold">Anunțurile tale</h1>

          <Link
            href="/add-product"
            className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold"
          >
            Adaugă anunț nou
          </Link>
        </div>

        <p className="opacity-70 mb-8 text-sm">
          Anunțurile active rămân aici până când expiră. Aceste anunțuri pot fi văzute de oricine și expiră la 30 de zile după ce au fost activate.
        </p>

        <div className="flex gap-4 mb-6 border-b border-white/10 pb-2">
          {["active", "pending", "topay", "disabled", "moderated"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1 rounded ${
                tab === t ? "bg-cyan-600" : "bg-white/10"
              }`}
            >
              {tabLabel(t, {
                activeCount,
                pendingCount,
                toPayCount,
                disabledCount,
                moderatedCount,
              })}
            </button>
          ))}
        </div>

        {tab === "active" && (
          <div>
            {activeCount === 0 ? (
              <div className="text-center opacity-70 py-20">
                <p>Nu ai anunțuri active</p>
                <Link
                  href="/add-product"
                  className="mt-4 inline-block px-5 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg"
                >
                  Publică un anunț
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {productsWithExpiry
                  .filter((p: any) => p.status === "active")
                  .map((p: any) => (
                    <div
                      key={p.id}
                      className="bg-[#070a20] border border-white/10 rounded-xl p-4"
                    >

                      {/* 🔥 SLIDER IMAGINI */}
                      <div className="relative w-full h-40 mb-3">
                        <img
                          src={
                            p.images?.[sliderIndex[p.id] || 0] ||
                            "/placeholder.png"
                          }
                          className="w-full h-full object-cover rounded-lg"
                        />

                        {p.images && p.images.length > 1 && (
                          <>
                            <button
                              onClick={() =>
                                setSliderIndex((prev: any) => ({
                                  ...prev,
                                  [p.id]:
                                    prev[p.id] === 0
                                      ? p.images.length - 1
                                      : (prev[p.id] || 0) - 1,
                                }))
                              }
                              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white px-2 py-1 rounded"
                            >
                              ‹
                            </button>

                            <button
                              onClick={() =>
                                setSliderIndex((prev: any) => ({
                                  ...prev,
                                  [p.id]:
                                    prev[p.id] === p.images.length - 1
                                      ? 0
                                      : (prev[p.id] || 0) + 1,
                                }))
                              }
                              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white px-2 py-1 rounded"
                            >
                              ›
                            </button>
                          </>
                        )}
                      </div>

                      <h3 className="text-lg font-bold mt-3">{p.name}</h3>
                      <p className="opacity-70">{p.price} €</p>

                      {p.expiresSoon && (
                        <p className="text-yellow-400 text-sm mt-1">
                          ⚠ Anunțul tău expiră în mai puțin de 24 de ore!
                        </p>
                      )}

                      {p.expired && (
                        <p className="text-red-400 text-sm mt-1">
                          ❌ Anunț expirat. Reînnoiește-l pentru a fi vizibil din nou.
                        </p>
                      )}

                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-sm"
                        >
                          Șterge
                        </button>

                        <Link
                          href={`/my-account/products/${p.id}`}
                          className="px-3 py-1 bg-yellow-600 hover:bg-yellow-500 rounded text-sm"
                        >
                          Editează
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function SidebarItem({ label, active }: { label: string; active?: boolean }) {
  return (
    <div
      className={`px-3 py-2 rounded cursor-pointer ${
        active ? "bg-cyan-600" : "hover:bg-white/10"
      }`}
    >
      {label}
    </div>
  );
}

function tabLabel(
  key: string,
  counts: {
    activeCount: number;
    pendingCount: number;
    toPayCount: number;
    disabledCount: number;
    moderatedCount: number;
  }
) {
  switch (key) {
    case "active":
      return `Active (${counts.activeCount})`;
    case "pending":
      return `În așteptare (${counts.pendingCount})`;
    case "topay":
      return `De plătit (${counts.toPayCount})`;
    case "disabled":
      return `Dezactivate (${counts.disabledCount})`;
    case "moderated":
      return `Moderate (${counts.moderatedCount})`;
    default:
      return key;
  }
}