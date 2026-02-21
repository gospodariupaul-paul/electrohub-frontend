import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 🔥 1. LOGIN ADMIN DIRECT (fără backend)
        if (
          credentials.email === "admin@electrohub.com" &&
          credentials.password === "123456"
        ) {
          return {
            id: "admin-1",
            name: "Administrator",
            email: "admin@electrohub.com",
            role: "ADMIN",
          };
        }

        // 🔥 2. LOGIN USER NORMAL (prin backend)
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );

        if (!res.ok) return null;

        const data = await res.json();

        const user =
          data.user ||
          data.data?.user ||
          data.data ||
          data;

        if (!user) return null;

        return {
          id: user.id || user._id,
          email: user.email,
          role: user.role || "USER",
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        role: token.role,
      };
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
};
