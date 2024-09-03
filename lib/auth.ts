import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import type { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions  = {
    providers: [
      credentials({
        name: "Credentials",
        id: "credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            await connectDB();
            const user = await User.findOne({
            email: credentials?.email,
            }).select("+password");
        
            if (!user) throw new Error("Invalid Email");
        
            const passwordMatch = await bcrypt.compare(
            credentials!.password,
            user.password
            );
        
            if (!passwordMatch) throw new Error("Invalid Password");
            return user;
        },
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_ID ?? "",
        clientSecret: process.env.GOOGLE_SECRET ?? ""
      })
    ],
    session: {
      strategy: "jwt",
    },
    callbacks: {
      jwt({ token, trigger, session }) {
        if (trigger === "update" && session?.name) {
          token.name = session.name
        }
        return token
      },
      async signIn({ user, account, profile, email, credentials }) {

        // await connectDB();
        
        // const existinguser = await User.findOne({
        //   email: email,
        // });
        // if(!existinguser) {
        //   const r = await register({
        //     email: user.email,
        //     password: "",
        //     name: user.name
        //   });
        //   return true;
        // }

        return true;
      },
    }
};