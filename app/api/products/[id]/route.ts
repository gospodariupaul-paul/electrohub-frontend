import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";

interface Params {
  params: { id: string };
}

export async function GET(_req: Request, { params }: Params) {
  await connectDB();
  const product = await Product.findById(params.id);
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(req: Request, { params }: Params) {
  await connectDB();
  const body = await req.json();
  const product = await Product.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(product);
}

export async function DELETE(_req: Request, { params }: Params) {
  await connectDB();
  await Product.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
