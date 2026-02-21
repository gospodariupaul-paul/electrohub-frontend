import { NextResponse } from "next/server";

export function middleware(req) {
  const jwtToken = req.cookies.get("token");
  const nextAuthToken =
    req.cookies.get("next-auth.session-token") ||
    req.cookies.get("__Secure-next-auth.session-token");

  // dacă nu există nici JWT, nici NextAuth → redirect
  if (!jwtToken && !nextAuthToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
