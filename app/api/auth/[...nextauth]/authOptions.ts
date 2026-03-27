import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // 🔥 IMPORTANT: nu mai permite auto-login
      authorization: {
        params: {
          prompt: "consent", // forțează alegerea contului
        },
      },
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // LOGIN ADMIN
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

        // LOGIN USER NORMAL
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
        const user = data.user || data.data?.user || data.data || data;

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
    // 🔥 BLOCARE RECREARE USER DUPĂ ȘTERGERE
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        // verificăm dacă userul există în backend
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/check-email?email=${user.email}`
        );

        const exists = await res.json();

        if (!exists?.found) {
          console.log("User șters → blocăm loginul Google");
          return false; // 🔥 NU recreăm userul
        }
      }

      return true;
    },

    async jwt({ token, user, account }) {
      if (account?.provider === "google" && user) {
        token.id = user.id || user.sub;
        token.email = user.email;
        token.role = "USER";
      }

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

    // 🔥 NU mai redirectăm automat după login Google
    async redirect() {
      return "/login";
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login", // 🔥 NU mai intră automat în Google
  },

  secret: process.env.NEXTAUTH_SECRET,
};
