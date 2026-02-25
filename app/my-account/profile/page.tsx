"use client";

import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function UserProfilePage() {
  const { user, loading } = useUser();
  const router = useRouter();

  const [tab, setTab] = useState("active");
  const [products, setProducts] = useState([]);

  // 🔥 FUNCTIE STERGERE PRODUS
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

      // 🔥 Scoatem produsul din listă instant
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Eroare la ștergere:", err);
    }
  };

  // 🔥 FETCH PRODUSE USER — FIXAT
  useEffect(() => {
    if (!user || !user.id) return; // FIX CRITIC

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

  // Redirect dacă nu e logat
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

  // ⭐ NUMĂRĂM ANUNȚURILE ACTIVE
  const activeCount = products.filter((p: any) => p.status === "active").length;

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
          <SidebarItem label="Chat" />
          <SidebarItem label="Notificări" />
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Anunțurile tale</h1>

          <Link
            href="/add-product"
            className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold"
          >
            Adaugă anunț nou
          </Link>
        </div>

        {/* TAB-URI */}
        <div className="flex gap-4 mb-6 border-b border-white/10 pb-2">
          {["active", "pending", "topay", "disabled", "moderated"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1 rounded ${
                tab === t ? "bg-cyan-600" : "bg-white/10"
              }`}
            >
              {tabLabel(t, activeCount)}
            </button>
          ))}
        </div>

        {/* LISTA PRODUSE ACTIVE */}
        {tab === "active" && (
          <div>
            {products.length === 0 ? (
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
                {products.map((p: any) => (
                  <div
                    key={p.id}
                    className="bg-[#070a20] border border-white/10 rounded-xl p-4"
                  >
                    <img
                      src={p.images?.[0] || "/placeholder.png"}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <h3 className="text-lg font-bold mt-3">{p.name}</h3>
                    <p className="opacity-70">{p.price} €</p>

                    {/* 🔥 BUTOANE ACTIUNI */}
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-sm"
                      >
                        Șterge
                      </button>

                      {/* 🔥 FIX RUTA EDITARE */}
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

function tabLabel(key: string, activeCount: number) {
  switch (key) {
    case "active":
      return `Active (${activeCount})`;
    case "pending":
      return "În așteptare";
    case "topay":
      return "De plătit";
    case "disabled":
      return "Dezactivate";
    case "moderated":
      return "Moderate";
    default:
      return key;
  }
}
