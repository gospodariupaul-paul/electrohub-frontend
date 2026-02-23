import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import clientPromise from "@/lib/mongodb";
import Image from "next/image";
import {
  Truck,
  Package,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return <div className="text-gray-400">Trebuie să fii autentificat.</div>;
  }

  const client = await clientPromise;
  const db = client.db("electrohub");

  const orders = await db
    .collection("orders")
    .aggregate([
      { $match: { userId: user.id } },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
    ])
    .sort({ createdAt: -1 })
    .toArray();

  const statusIcons: any = {
    preparing: <Clock className="text-yellow-400" size={26} />,
    shipped: <Package className="text-blue-400" size={26} />,
    in_transit: <Truck className="text-cyan-400" size={26} />,
    delivering: <Truck className="text-purple-400" size={26} />,
    delivered: <CheckCircle className="text-green-400" size={26} />,
    cancelled: <XCircle className="text-red-400" size={26} />,
  };

  const statusText: any = {
    preparing: "În pregătire",
    shipped: "Predat curierului",
    in_transit: "În tranzit",
    delivering: "În livrare",
    delivered: "Livrat",
    cancelled: "Anulat",
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Livrări / Comenzi</h1>

      {orders.length === 0 && (
        <p className="text-gray-400">Nu ai comenzi înregistrate.</p>
      )}

      <div className="space-y-4">
        {orders.map((order: any) => (
          <div
            key={order._id}
            className="bg-[#111] border border-[#222] rounded-xl p-4 flex justify-between items-center hover:border-cyan-500 transition"
          >
            {/* Stânga: imagine + titlu */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 relative">
                <Image
                  src={order.product.images?.[0] || "/placeholder.png"}
                  alt={order.product.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              <div>
                <p className="text-lg font-semibold">{order.product.title}</p>
                <p className="text-cyan-400 font-bold">{order.price} RON</p>
                <p className="text-gray-500 text-sm">
                  Comandă din:{" "}
                  {new Date(order.createdAt).toLocaleDateString("ro-RO")}
                </p>
              </div>
            </div>

            {/* Dreapta: status + acțiuni */}
            <div className="text-right space-y-2">
              <div className="flex items-center justify-end gap-2">
                {statusIcons[order.status]}
                <span className="font-semibold">
                  {statusText[order.status]}
                </span>
              </div>

              <div className="flex gap-2 justify-end">
                {order.awb && (
                  <a
                    href={`https://www.fancourier.ro/awb-tracking/?awb=${order.awb}`}
                    target="_blank"
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm"
                  >
                    Tracking AWB
                  </a>
                )}

                <a
                  href={`/account/orders/${order._id}`}
                  className="px-3 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-sm"
                >
                  Detalii
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
