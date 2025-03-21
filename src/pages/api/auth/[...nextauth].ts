import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/db";
import Admin from "@/models/admin.models";
import bcrypt from "bcryptjs";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const admin = await Admin.findOne({ email: credentials?.email });

        if (!admin) throw new Error("Invalid Email or Password");

        const isMatch = await bcrypt.compare(credentials?.password, admin.password);
        if (!isMatch) throw new Error("Invalid Email or Password");

        return { id: admin._id, name: admin.name, email: admin.email };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
  },
});
