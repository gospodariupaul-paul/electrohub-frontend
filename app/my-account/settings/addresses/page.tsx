"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function SavedAddressesPage() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // FORMULAR ADĂUGARE
  const [newAddress, setNewAddress] = useState({
    name: "",
    address: "",
    city: "",
  });

  // EDITARE
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({
    name: "",
    address: "",
    city: "",
  });

  // ANIMAȚIE ȘTERGERE
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const addAddress = async () => {
    await axiosInstance.post("/addresses", newAddress, { withCredentials: true });
    setNewAddress({ name: "", address: "", city: "" });
    reloadAddresses();
  };

  const reloadAddresses = async () => {
    const res = await axiosInstance.get("/addresses", { withCredentials: true });
    setAddresses(res.data);
  };

  const deleteAddress = async (id: number) => {
    const confirmDelete = confirm("Ești sigur că vrei să ștergi această adresă?");
    if (!confirmDelete) return;

    setDeletingId(id);

    setTimeout(async () => {
      await axiosInstance.delete(`/addresses/${id}`, { withCredentials: true });
      reloadAddresses();
      setDeletingId(null);
    }, 300);
  };

  const startEdit = (a: any) => {
    setEditingId(a.id);
    setEditData({
      name: a.name,
      address: a.address,
      city: a.city,
    });
  };

  const saveEdit = async () => {
    await axiosInstance.put(`/addresses/${editingId}`, editData, {
      withCredentials: true,
    });
    setEditingId(null);
    reloadAddresses();
  };

  useEffect(() => {
    reloadAddresses().finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#0b141a] text-white p-6">
      <button
        onClick={() => router.push("/my-account/settings")}
        className="mb-6 px-4 py-2 bg-[#00aaff] text-black rounded-lg font-semibold hover:bg-[#008fcc]"
      >
        ← Înapoi la setări
      </button>

      <h1 className="text-2xl font-bold mb-6">Adrese salvate</h1>

      {loading && <p>Se încarcă...</p>}

      {!loading && addresses.length === 0 && (
        <p className="text-gray-400">Nu ai adrese salvate.</p>
      )}

      <div className="grid gap-4 max-w-lg">
        {addresses.map((a) => (
          <div
            key={a.id}
            className={`bg-[#111b21] p-4 rounded-lg border border-white/10 transition-all duration-300 ${
              deletingId === a.id ? "opacity-0 translate-x-5" : ""
            }`}
          >
            {editingId === a.id ? (
              <>
                <input
                  className="w-full mb-2 p-2 rounded bg-[#0b141a] border border-white/20"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                />
                <input
                  className="w-full mb-2 p-2 rounded bg-[#0b141a] border border-white/20"
                  value={editData.address}
                  onChange={(e) =>
                    setEditData({ ...editData, address: e.target.value })
                  }
                />
                <input
                  className="w-full mb-2 p-2 rounded bg-[#0b141a] border border-white/20"
                  value={editData.city}
                  onChange={(e) =>
                    setEditData({ ...editData, city: e.target.value })
                  }
                />

                <button
                  onClick={saveEdit}
                  className="px-3 py-1 bg-green-500 text-black rounded mr-2"
                >
                  Salvează
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="px-3 py-1 bg-gray-500 text-white rounded"
                >
                  Anulează
                </button>
              </>
            ) : (
              <>
                <p className="font-semibold">{a.name}</p>
                <p className="text-gray-400">{a.address}</p>
                <p className="text-gray-400">{a.city}</p>

                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => startEdit(a)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    ✏️ Editare
                  </button>

                  <button
                    onClick={() => deleteAddress(a.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
                  >
                    🗑️ Șterge
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* FORMULAR ADĂUGARE */}
      <div className="bg-[#111b21] p-4 rounded-lg border border-white/10 max-w-lg mt-6">
        <h2 className="font-semibold mb-3">Adaugă o adresă</h2>

        <input
          className="w-full mb-2 p-2 rounded bg-[#0b141a] border border-white/20"
          placeholder="Nume adresă (ex: Acasă)"
          value={newAddress.name}
          onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
        />

        <input
          className="w-full mb-2 p-2 rounded bg-[#0b141a] border border-white/20"
          placeholder="Adresă"
          value={newAddress.address}
          onChange={(e) =>
            setNewAddress({ ...newAddress, address: e.target.value })
          }
        />

        <input
          className="w-full mb-2 p-2 rounded bg-[#0b141a] border border-white/20"
          placeholder="Oraș"
          value={newAddress.city}
          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
        />

        <button
          onClick={addAddress}
          className="px-4 py-2 bg-green-500 text-black rounded hover:bg-green-600 transition"
        >
          Salvează adresa
        </button>
      </div>
    </div>
  );
}
