import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        console.log("STEP 1");
        if (
          !credentials?.email ||           
          !credentials?.password
        ) {
          console.log("NO CREDENTIALS");
          return null;
        }

         console.log(
    "EMAIL:",
    credentials.email
  );
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        console.log("USER:", user);
        if (!user) {
          return null;
        }
        
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        console.log("IS PASSWORD VALID:", isPasswordValid);

        if (!isPasswordValid) {
          return null;
        }
        console.log("LOGIN SUCCESS");
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],

  session: { //setelah login berhasil server perlu mengingat siapa user sekarang
    strategy: "jwt", //Session disimpan dalam token terenkripsi
  },

  secret: process.env.AUTH_SECRET, //dipakai untuk sign & verify JWT/cap resmi server
};