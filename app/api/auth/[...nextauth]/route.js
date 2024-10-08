// import NextAuth from "next-auth";
// import { PrismaClient } from "@prisma/client";
// import {CredentialsProvider} from "next-auth/providers/credentials";
// import {Next_AUTH_CONFIG}from "@/app/lib/auth"


// secret: process.env.NEXTAUTH_SECRET;
// const handler = NextAuth(Next_AUTH_CONFIG)
// export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import {Next_AUTH_CONFIG} from "@/app/lib/auth";

// NextAuth configuration with secret properly defined
const handler = NextAuth({
  ...Next_AUTH_CONFIG,
  secret: process.env.NEXTAUTH_SECRET // Set the secret here
});

export { handler as GET, handler as POST };
