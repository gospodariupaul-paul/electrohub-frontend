import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

        if (!res.ok) return null;

        const data = await res.json();

        if (!data || !data.user) return null;

        // RETURNĂM TOT CE CERE TIPUL USER
        return {
          id: data.user.id,
          name: data.user.name ?? data.user.email,
          email: data.user.email,
          role: data.user.role,
          access_token: data.access_token, // ← OBLIGATORIU
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.access_token = user.access_token; // ← OBLIGATORIU
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        name: token.name as string,
        role: token.role as string,
        access_token: token.access_token as string, // ← OBLIGATORIU
      };
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
