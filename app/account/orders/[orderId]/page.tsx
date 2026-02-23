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

export default async function OrderDetails({ params }: any) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return <div className="text-gray-400">Trebuie să fii autentificat.</div>;
  }

  const client = await clientPromise;
  const db = client.db("electrohub");

  const order = await db
    .collection("orders")
    .aggregate([
      { $match: { _id: params.orderId } },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $lookup: {
          from: "users",
          localField: "sellerId",
          foreignField: "_id",
          as: "seller",
        },
      },
      { $unwind: "$seller" },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "buyer",
        },
      },
      { $unwind: "$buyer" },
    ])
    .toArray();

  if (!order[0]) {
    return <div className="text-gray-400">Comanda nu există.</div>;
  }

  const data = order[0];

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

  const timeline = [
    { key: "preparing", label: "În pregătire" },
    { key: "shipped", label: "Predat curierului" },
    { key: "in_transit", label: "În tranzit" },
    { key: "delivering", label: "În livrare" },
    { key: "delivered", label: "Livrat" },
  ];

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold">Detalii comandă</h1>

      {/* Informații comandă */}
      <div className="bg-[#111] p-6 rounded-xl border border-[#222] space-y-3">
        <p className="text-lg font-semibold">Comanda #{data._id}</p>
        <p className="text-gray-400">
          Plasată la: {new Date(data.createdAt).toLocaleString("ro-RO")}
        </p>

        <div className="flex items-center gap-2">
          {statusIcons[data.status]}
          <span className="font-semibold">{statusText[data.status]}</span>
        </div>

        {data.awb && (
          <a
            href={`https://www.fancourier.ro/awb-tracking/?awb=${data.awb}`}
            target="_blank"
            className="text-cyan-400 underline"
          >
            Tracking AWB: {data.awb}
          </a>
        )}
      </div>

      {/* Timeline */}
      <div className="bg-[#111] p-6 rounded-xl border border-[#222]">
        <h2 className="text-xl font-semibold mb-4">Status livrare</h2>

        <div className="flex flex-col gap-4">
          {timeline.map((step) => (
            <div key={step.key} className="flex items-center gap-3">
              <div
                className={`w-4 h-4 rounded-full ${
                  step.key === data.status
                    ? "bg-cyan-500"
                    : "bg-gray-600"
                }`}
              ></div>
              <span
                className={
                  step.key === data.status
                    ? "text-cyan-400 font-semibold"
                    : "text-gray-400"
                }
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Produs */}
      <div className="bg-[#111] p-6 rounded-xl border border-[#222] flex gap-4">
        <div className="w-24 h-24 relative">
          <Image
            src={data.product.images?.[0] || "/placeholder.png"}
            alt={data.product.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div>
          <p className="text-lg font-semibold">{data.product.title}</p>
          <p className="text-cyan-400 font-bold">{data.price} RON</p>
        </div>
      </div>

      {/* Cumpărător */}
      <div className="bg-[#111] p-6 rounded-xl border border-[#222]">
        <h2 className="text-xl font-semibold mb-2">Cumpărător</h2>
        <p>{data.buyer.name}</p>
        <p className="text-gray-400">{data.buyer.phone}</p>
        <p className="text-gray-400">{data.buyer.location}</p>
      </div>

      {/* Vânzător */}
      <div className="bg-[#111] p-6 rounded-xl border border-[#222]">
        <h2 className="text-xl font-semibold mb-2">Vânzător</h2>
        <p>{data.seller.name}</p>
        <p className="text-gray-400">{data.seller.phone}</p>
        <p className="text-gray-400">{data.seller.location}</p>

        <a
          href={`/chat/${data.sellerId}`}
          className="mt-3 inline-block px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-sm font-semibold"
        >
          Contactează vânzătorul
        </a>
      </div>
    </div>
  );
}
