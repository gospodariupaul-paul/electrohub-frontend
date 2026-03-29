"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix pentru iconițele Leaflet în Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function ProductMap({ location }: { location: string }) {
  // Default: Iași
  let coords: [number, number] = [47.1585, 27.6014];

  // Poți extinde aici cu alte orașe
  const knownLocations: Record<string, [number, number]> = {
    "iasi": [47.1585, 27.6014],
    "bucuresti": [44.4268, 26.1025],
    "cluj": [46.7712, 23.6236],
    "timisoara": [45.7489, 21.2087],
  };

  const key = location?.toLowerCase().trim();
  if (knownLocations[key]) coords = knownLocations[key];

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
