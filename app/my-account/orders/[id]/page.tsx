"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { FiTruck, FiCopy, FiMapPin, FiPackage } from "react-icons/fi";

const API = process.env.NEXT_PUBLIC_API_URL;

// Leaflet doar pe client
const Map = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(m => m.Marker), { ssr: false });

export default function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [awb, setAwb] = useState<string | null>(null);
  const [tracking, setTracking] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [userLocation, setUserLocation] = useState<any>(null);
  const [locker, setLocker] = useState<any>(null);

  const [form, setForm] = useState({
    weight: 1,
    parcels: 1,
    cod: 0,
    declaredValue: 0,
  });

  useEffect(() => {
    loadOrder();
    loadShipment();
  }, [id]);

  useEffect(() => {
    if (order?.user?.address) {
      const fullAddress = `${order.user.address}, ${order.user.city}, ${order.user.county}`;
      loadLocker(fullAddress);
    }
  }, [order?.user?.address, order?.user?.city, order?.user?.county]);

  async function loadOrder() {
    try {
      const res = await fetch(`${API}/orders/${id}`, { credentials: "include" });
      const data = await res.json();
      setOrder(data);

      if (data?.user?.address) {
        const fullAddress = `${data.user.address}, ${data.user.city}, ${data.user.county}`;
        loadLocker(fullAddress);
      }

    } catch (e) {
      console.error("Eroare la încărcarea comenzii:", e);
    } finally {
      setLoading(false);
    }
  }

  async function loadShipment() {
    try {
      const res = await fetch(`${API}/fancourier/orders/${id}/shipments`, {
        credentials: "include",
      });
      const data = await res.json();

      if (data && data.length > 0) {
        setAwb(data[0].awb);
        loadTracking(data[0].awb);
      }
    } catch {}
  }

  async function loadTracking(awbNumber: string) {
    try {
      const res = await fetch(`${API}/fancourier/tracking/${awbNumber}`);
      const data = await res.json();
      setTracking(data.history || []);
    } catch (e) {
      console.error("Tracking error:", e);
    }
  }

  // ⭐ FIX CACHE BUSTER — elimină 304
  async function loadLocker(address: string) {
    try {
      const res = await fetch(
        `${API}/fancourier/locker/nearest?address=${encodeURIComponent(address)}&t=${Date.now()}`
      );

      const data = await res.json();

      console.log("RESPONSE:", data);
      
      if (data.userLocation) {
        setUserLocation({
          lat: Number(data.userLocation.lat),
          lon: Number(data.userLocation.lon),
        });
      }

      if (data.locker) {
        setLocker({
          name: data.locker.name,
          lat: Number(data.locker.lat),
          lon: Number(data.locker.lon),
        });
      }

    } catch (e) {
      console.error("Eroare locker:", e);
    }
  }

  async function generateAwb() {
    try {
      const res = await fetch(`${API}/fancourier/orders/${id}/awb`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setAwb(data.awb);
      loadTracking(data.awb);
    } catch (e) {
      console.error("Eroare generare AWB:", e);
    }
  }

  if (loading) {
    return <div className="text-center py-20 text-gray-400">Se încarcă...</div>;
  }

  if (!order) {
    return <div className="text-center py-20 text-red-400">Comanda nu există.</div>;
  }

  const createdAt = new Date(order.createdAt).toLocaleString("ro-RO");

  const steps = [
    { key: "processing", label: "Comandă procesată" },
    { key: "packed", label: "Comandă ambalată" },
    { key: "shipped", label: "Expediată către tine" },
    { key: "delivered", label: "Livrată" },
  ];

  const activeIndex = steps.findIndex((s) => s.key === order.status);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-white">
      <h1 className="text-3xl font-bold mb-2">Comanda #{order.id}</h1>
      <p className="text-gray-400 mb-6">Plasată la: {createdAt}</p>

      <div className="mb-6">
        <span className="px-4 py-2 rounded-lg bg-[#1e293b] text-[#00eaff] font-semibold capitalize">
          {order.status}
        </span>
      </div>

      <div className="mb-10 bg-[#0f172a] p-5 rounded-xl border border-white/10">
        <h2 className="text-xl font-semibold mb-4">Stadiu comandă</h2>

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-1 bg-white/10 rounded-full"></div>

          <div className="space-y-8">
            {steps.map((step, index) => {
              const isActive = index <= activeIndex;

              return (
                <div key={step.key} className="relative pl-12">
                  <div
                    className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                      isActive
                        ? "bg-[#00eaff] border-[#00eaff] text-black"
                        : "bg-[#1e293b] border-white/20 text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </div>

                  <p
                    className={`text-lg ${
                      isActive ? "text-white font-semibold" : "text-gray-500"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-[#0f172a] p-5 rounded-xl border border-white/10 mb-6">
        <h2 className="text-xl font-semibold mb-3">Produse</h2>
        {order.items.map((item: any, i: number) => (
          <div key={i} className="text-gray-300 text-sm mb-1">
            • {item.product.name} — {item.quantity} buc — {item.price} lei
          </div>
        ))}
        <p className="font-bold text-lg mt-3">Total: {order.total} lei</p>
      </div>

      <div className="bg-[#0f172a] p-5 rounded-xl border border-white/10 mb-6">
        <h2 className="text-xl font-semibold mb-3">Adresă livrare</h2>
        <p>{order.user.name}</p>
        <p>{order.user.address || "Adresă necompletată"}</p>
        <p>{order.user.city || ""} {order.user.county || ""}</p>
        <p>{order.user.phone || ""}</p>
      </div>

      {!awb && (
        <div className="bg-[#0f172a] p-5 rounded-xl border border-white/10 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FiPackage /> Generează AWB FanCourier
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              className="bg-black/30 p-3 rounded-lg border border-white/10"
              placeholder="Greutate (kg)"
              value={form.weight}
              onChange={(e) => setForm({ ...form, weight: Number(e.target.value) })}
            />
            <input
              type="number"
              className="bg-black/30 p-3 rounded-lg border border-white/10"
              placeholder="Colete"
              value={form.parcels}
              onChange={(e) => setForm({ ...form, parcels: Number(e.target.value) })}
            />
            <input
              type="number"
              className="bg-black/30 p-3 rounded-lg border border-white/10"
              placeholder="Ramburs (lei)"
              value={form.cod}
              onChange={(e) => setForm({ ...form, cod: Number(e.target.value) })}
            />
            <input
              type="number"
              className="bg-black/30 p-3 rounded-lg border border-white/10"
              placeholder="Valoare declarată"
              value={form.declaredValue}
              onChange={(e) => setForm({ ...form, declaredValue: Number(e.target.value) })}
            />
          </div>

          <button
            onClick={generateAwb}
            className="mt-4 bg-[#00eaff] text-black px-6 py-3 rounded-lg font-semibold hover:bg[#00c7d6] transition"
          >
            Generează AWB
          </button>
        </div>
      )}

      {awb && (
        <div className="bg-[#0f172a] p-5 rounded-xl border border-white/10 mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <FiTruck /> AWB generat
          </h2>

          <p className="text-lg font-bold mb-2">{awb}</p>

          <button
            onClick={() => navigator.clipboard.writeText(awb)}
            className="bg-white/10 px-4 py-2 rounded-lg text-sm hover:bg-white/20 transition flex items-center gap-2"
          >
            <FiCopy /> Copiază AWB
          </button>
        </div>
      )}

      {tracking.length > 0 && (
        <div className="bg-[#0f172a] p-5 rounded-xl border border-white/10 mb-6">
          <h2 className="text-xl font-semibold mb-3">Tracking</h2>

          {tracking.map((t: any, i: number) => (
            <div key={i} className="border-l-2 border-[#00eaff] pl-3 mb-3">
              <p className="text-[#00eaff] font-semibold">{t.status}</p>
              <p className="text-gray-400 text-sm">{t.date}</p>
            </div>
          ))}
        </div>
      )}

      <div className="bg-[#0f172a] p-5 rounded-xl border border-white/10">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <FiMapPin /> Locker FANbox
        </h2>

        <div className="h-[400px] rounded-xl overflow-hidden">
          <Map
            center={
              locker
                ? [locker.lat, locker.lon]
                : userLocation
                ? [userLocation.lat, userLocation.lon]
                : [47.1585, 27.6014]
            }
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {userLocation && (
              <Marker position={[userLocation.lat, userLocation.lon]} />
            )}

            {locker && (
              <Marker position={[locker.lat, locker.lon]} />
            )}
          </Map>
        </div>
      </div>
    </div>
  );
}
