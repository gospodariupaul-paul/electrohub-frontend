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

  const [sliderIndex, setSliderIndex] = useState<any>({});
  const [unreadCount, setUnreadCount] = useState(0);
  const [adminUnread, setAdminUnread] = useState(0);
  const [unseenRatings, setUnseenRatings] = useState(0);

  const notificationCount = user ? getUnreadCount(user.id) : 0;

  // FETCH UNREAD CHAT MESSAGES
  useEffect(() => {
    if (!user || !user.id) return;

    const fetchUnread = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/conversations/user/${user.id}`,
          {
            credentials: "include",
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

  // FETCH UNREAD ADMIN SUPPORT MESSAGES (varianta sigură)
useEffect(() => {
  if (!user || !user.id) return;

  fetch(`${process.env.NEXT_PUBLIC_API_URL}/support/my`, {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((messages) => {
      // Mesajele primite de la admin sunt cele cu reply
      const unread = messages.filter((m: any) => m.reply && !m.read).length;

      // Dacă backend-ul nu are "read", folosește doar m.reply
      // const unread = messages.filter((m: any) => m.reply).length;

      setAdminUnread(unread);
    })
    .catch((err) => console.error("Eroare la unread admin:", err));
}, [user]);

  // FETCH NOTIFICATIONS
  useEffect(() => {
    if (!user || !user.id) return;

    const fetchNotifications = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/notifications/${user.id}`,
          { credentials: "include" }
        );

        const data = await res.json();
        localStorage.setItem("notifications", JSON.stringify(data));
      } catch (err) {
        console.error("Eroare la fetch notificări:", err);
      }
    };

    fetchNotifications();
  }, [user]);

  // FETCH PRODUCTS
  useEffect(() => {
    if (!user || !user.id) return;

    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/user/${user.id}`,
          {
            credentials: "include",
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

  // FETCH UNSEEN RATINGS
  useEffect(() => {
    if (!user || !user.id) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/ratings/me`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const unseen = data.filter((r: any) => !r.seen).length;
        setUnseenRatings(unseen);
      })
      .catch((err) => console.error("Eroare la ratinguri:", err));
  }, [user]);

  // DELETE PRODUCT
  const handleDelete = async (id: number) => {
    if (!confirm("Sigur vrei să ștergi acest anunț?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
        {
          method: "DELETE",
          credentials: "include",
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

  // REDIRECT LOGIC
  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    if (user.role === "admin") {
      router.push("/dashboard");
      return;
    }
  }, [loading, user]);

  // LOADING STATE
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Se încarcă...
      </div>
    );
  }

  // NOT LOGGED IN
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Trebuie să fii logat
      </div>
    );
  }

  // PRODUCT COUNTS
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

          <Link href="/my-account/messages" className="relative block">
            <SidebarItem label="Chat" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </Link>

          <Link href="/my-account/notifications" className="relative block">
            <SidebarItem label="Notificări" />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                {notificationCount}
              </span>
            )}
          </Link>

          <Link href="/my-account/orders" className="block">
           <SidebarItem label="Comenzi" />
          </Link>

          <SidebarItem label="Plăți" />


          <Link href="/my-account/ratinguri" className="relative block">
            <SidebarItem label="Ratinguri" />
            {unseenRatings > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                {unseenRatings}
              </span>
            )}
          </Link>

          <Link href="/my-account/support" className="relative block">
            <SidebarItem label="Mesaje de la Admin" />
            {adminUnread > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                {adminUnread}
              </span>
            )}
          </Link>

          <Link href="/my-account/user-profile" className="block">
            <SidebarItem label="Profil" />
          </Link>

          <Link href="/my-account/settings" className="block">
            <SidebarItem label="Setări" />
          </Link>
        </nav>

        <div className="pt-6 border-t border-white/10">
          <Link href="/favorites" className="block">
            <SidebarItem label="Favorite" />
          </Link>

          <Link href="/saved-searches" className="block">
            <SidebarItem label="Căutări salvate" />
          </Link>

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
          Anunțurile active rămân aici până când expiră. Aceste anunțuri pot fi
          văzute de oricine și expiră la 30 de zile după ce au fost activate.
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
                          ❌ Anunț expirat. Reînnoiește-l pentru a fi vizibil din
                          nou.
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
