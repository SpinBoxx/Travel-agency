import prismadb from "@/lib/prismadb";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "text" },
        password: { type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid credentials");
        }
        throw new Error("Invalid credentials");
        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.password) {
          throw new Error("Invalid Credentials");
        }

        return user;
      },
    }),
  ],
});
