"use client";

import { Star } from "lucide-react";

export default function RatingItem({ data }: any) {
  return (
    <div className="bg-[#111] p-4 rounded-xl border border-[#222]">
      <div className="flex items-center justify-between">
        {/* Stele */}
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={20}
              className={i <= data.stars ? "text-yellow-400" : "text-gray-600"}
              fill={i <= data.stars ? "currentColor" : "none"}
            />
          ))}
        </div>

        <p className="text-gray-500 text-sm">
          {new Date(data.createdAt).toLocaleDateString("ro-RO")}
        </p>
      </div>

      {/* Comentariu */}
      {data.comment && (
        <p className="mt-2 text-gray-300">{data.comment}</p>
      )}

      {/* Cine a dat ratingul */}
      <p className="mt-2 text-gray-500 text-sm">
        De la: {data.fromUser.name} ({data.role === "seller" ? "cumpărător" : "vânzător"})
      </p>
    </div>
  );
}
