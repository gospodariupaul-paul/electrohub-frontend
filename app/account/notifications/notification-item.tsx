"use client";

import { useState } from "react";
import axios from "@/lib/axios";
import {
  Bell,
  MessageCircle,
  Package,
  Star,
  User,
  Tag,
  AlertTriangle,
} from "lucide-react";

export default function NotificationItem({ data }: any) {
  const [read, setRead] = useState(data.read);

  const icons: any = {
    message: <MessageCircle className="text-cyan-400" size={26} />,
    listing: <Tag className="text-green-400" size={26} />,
    account: <User className="text-yellow-400" size={26} />,
    delivery: <Package className="text-purple-400" size={26} />,
    rating: <Star className="text-orange-400" size={26} />,
    promo: <AlertTriangle className="text-red-400" size={26} />,
    default: <Bell className="text-gray-400" size={26} />,
  };

  const markAsRead = async () => {
    setRead(true);
    await axios.patch(`/api/notifications/${data._id}`, { read: true });
  };

  const remove = async () => {
    await axios.delete(`/api/notifications/${data._id}`);
    window.location.reload();
  };

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl border ${
        read ? "border-[#222]" : "border-cyan-600"
      } bg-[#111]`}
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div>{icons[data.type] || icons.default}</div>

        {/* Text */}
        <div>
          <p className="font-semibold">{data.title}</p>
          <p className="text-gray-400 text-sm">{data.message}</p>
          <p className="text-gray-500 text-xs mt-1">
            {new Date(data.createdAt).toLocaleString("ro-RO")}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {!read && (
          <button
            onClick={markAsRead}
            className="px-3 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-sm"
          >
            Marchează citit
          </button>
        )}

        <button
          onClick={remove}
          className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
        >
          Șterge
        </button>

        {data.link && (
          <a
            href={data.link}
            className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm"
          >
            Deschide
          </a>
        )}
      </div>
    </div>
  );
}
