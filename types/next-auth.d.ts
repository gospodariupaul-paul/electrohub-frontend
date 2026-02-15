import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    role: string; // ← ADĂUGAT
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string; // ← ADĂUGAT
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name: string;
    role: string; // ← ADĂUGAT
  }
}
