import { auth } from "next-auth";

export default auth((req) => {
  // Protejăm doar rutele de admin
  const protectedRoutes = [
    "/dashboard",
    "/products",
    "/categories",
    "/users",
  ];

  const pathname = req.nextUrl.pathname;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !req.auth) {
    return Response.redirect(new URL("/login", req.url));
  }
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/products/:path*",
    "/categories/:path*",
    "/users/:path*",
  ],
};
