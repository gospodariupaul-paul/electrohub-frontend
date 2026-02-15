import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
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

        if (!response.ok) {
          return null;
        }

        const data = await response.json();

        // Construim user-ul EXACT cum îl cere tipul tău
        return {
          id: data.id || data.userId || data._id || "generated-id",
          email: data.email || credentials.email,
          name: data.name || "User",

          // câmpuri cerute de tipul User din proiectul tău
          role: data.role || "user",
          access_token: data.access_token || data.token || null,

          // păstrăm tot backend-ul
          backendData: data,
        };
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

        token.role = user.role;
        token.access_token = user.access_token;

        token.backendData = user.backendData;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,

        role: token.role,
        access_token: token.access_token,

        backendData: token.backendData,
      };
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
