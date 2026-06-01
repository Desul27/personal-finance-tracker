import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        return null;
      },
    }),
  ],

  session: { //setelah login berhasil server perlu mengingat siapa user sekarang
    strategy: "jwt", //Session disimpan dalam token terenkripsi
  },

  secret: process.env.AUTH_SECRET, //dipakai untuk sign & verify JWT/cap resmi server
};