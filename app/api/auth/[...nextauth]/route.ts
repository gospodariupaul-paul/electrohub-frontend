import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // Trimitem datele la backend-ul tău
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );

        // Dacă backend-ul răspunde cu eroare → login invalid
        if (!response.ok) {
          return null;
        }

        // Backend-ul tău poate returna ORICE structură
        const data = await response.json();

        // NextAuth are nevoie de un user cu un ID obligatoriu
        // Dacă backend-ul tău nu trimite id, îl generăm noi
        const user = {
          id: data.id || data.userId || data._id || "generated-id",
          email: data.email || credentials.email,
          name: data.name || "User",
          token: data.token || null,
          ...data,
        };

        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.token = user.token;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,
        token: token.token,
      };
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
