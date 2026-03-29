"use client";

import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Icon default Leaflet
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function ProductMap({ location }: { location: string }) {
  const [coords, setCoords] = useState<[number, number]>([47.1585, 27.6014]); // fallback Iași
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!location) return;

    const query = `${location} Romania`;

    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          setCoords([lat, lon]);
        }
      })
      .catch(() => {
        console.warn("Geocoding failed, using fallback coordinates");
      })
      .finally(() => setLoading(false));
  }, [location]);

  if (loading) {
    return (
      <div className="w-full h-64 flex items-center justify-center text-gray-400">
        Se încarcă harta...
      </div>
    );
  }

  return (
    <div className="w-full h-64 rounded-xl overflow-hidden border border-white/10 mt-4">
      <MapContainer
        center={coords}
        zoom={12}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coords} icon={icon}>
          <Popup>Locație aproximativă: {location}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
