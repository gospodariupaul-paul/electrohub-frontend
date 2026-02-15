import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    access_token: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      access_token: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name: string;
    role: string;
    access_token: string;
  }
}
