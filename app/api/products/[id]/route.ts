import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";

type RouteContext = {
  params: {
    id: string;
  };
};

export async function GET(req: NextRequest, context: RouteContext) {
  await connectDB();
  const { id } = context.params;
  const product = await Product.findById(id);
  return NextResponse.json(product);
}

export async function PUT(req: NextRequest, context: RouteContext) {
  await connectDB();
  const { id } = context.params;
  const data = await req.json();
  const updated = await Product.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  await connectDB();
  const { id } = context.params;
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}
