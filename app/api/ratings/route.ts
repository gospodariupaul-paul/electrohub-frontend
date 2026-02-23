import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
      return NextResponse.json(
        { error: "Neautorizat" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { orderId, stars, comment } = body;

    if (!orderId || !stars) {
      return NextResponse.json(
        { error: "Date incomplete" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("electrohub");

    const order = await db.collection("orders").findOne({
      _id: orderId,
      userId: user.id,
    });

    if (!order) {
      return NextResponse.json(
        { error: "Nu ai voie să evaluezi această comandă" },
        { status: 403 }
      );
    }

    const existing = await db.collection("ratings").findOne({
      orderId,
      fromUserId: user.id,
    });

    if (existing) {
      return NextResponse.json(
        { error: "Ai lăsat deja un rating pentru această comandă" },
        { status: 400 }
      );
    }

    const rating = {
      userId: order.sellerId,
      fromUserId: user.id,
      orderId,
      stars,
      comment: comment || "",
      role: "buyer",
      createdAt: new Date(),
    };

    await db.collection("ratings").insertOne(rating);

    await db.collection("orders").updateOne(
      { _id: orderId },
      { $set: { rated: true } }
    );

    await db.collection("notifications").insertOne({
      userId: order.sellerId,
      type: "rating",
      title: "Ai primit un rating nou",
      message: `Cumpărătorul a lăsat un rating de ${stars} stele.`,
      link: `/account/ratings`,
      read: false,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Eroare server" },
      { status: 500 }
    );
  }
}
