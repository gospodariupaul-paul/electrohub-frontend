import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://electrohub-backend-1-10qa.onrender.com/products", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API /products error:", error);
    return NextResponse.json(
      { error: "Failed to load products" },
      { status: 500 }
    );
  }
}
