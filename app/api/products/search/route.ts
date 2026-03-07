import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q || q.trim() === "") {
    return NextResponse.json([]);
  }

  const products = await prisma.$queryRawUnsafe(`
    SELECT *
    FROM "Product"
    WHERE 
      to_tsvector(
        'simple',
        coalesce(name, '') || ' ' ||
        coalesce(description, '') || ' ' ||
        coalesce("categoryName", '')
      )
      @@ plainto_tsquery('simple', '${q}');
  `);

  return NextResponse.json(products);
}
