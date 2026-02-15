import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // PAGINI PUBLICE + RUTE NEXTAUTH
  const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/api/auth",
    "/api/auth/:path*"
  ];

  // dacă ruta este publică → nu o protejăm
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // TOKEN
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // RUTE PROTEJATE
  const protectedRoutes = [
    "/dashboard",
    "/products",
    "/categories",
    "/users",
  ];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/products/:path*",
    "/categories/:path*",
    "/users/:path*",
    "/api/auth/:path*"
  ],
};
