//ini adalah API endpoint auth system 
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);//buat auth engine berdasar config

export { handler as GET, handler as POST }; //auth flow menerima GET dan POST

// Kenapa [...nextauth]?
// Karena Auth.js membutuhkan banyak route internal:
// api/auth/signin
// api/auth/signout
// api/auth/session
// api/auth/callback

// ini dinamakan catch all route