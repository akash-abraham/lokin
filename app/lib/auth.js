import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
// import { cookies } from 'next/headers'

const prisma = new PrismaClient();

export const Next_AUTH_CONFIG = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@example.com" },
        password: { label: "Password", type: "password", placeholder: "Your password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const { username: email, password } = credentials;
        console.log(email, password);

        // Check for bus owner first
        const user = await prisma.user.findFirst({
          where: {
            email: email,
            password: password,
          },
        });


        
        if(!user){
                return null;
        }
         // No user found
         return{
            id:user.id,
            name:user.name,
            email:user.email,
        };
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    session: async ({ session, token }) => {
      if(session?.user){
      session.user.id =  token.id;
      session.user.email = token.email;
      }
      return session;
    },
    jwt: async ({ token, user }) => {
      // If the user object is present, attach relevant information to the token
      if (user) {
        token.id = user.id; // Assuming user has an id field
        token.email = user.email;
      }
      return token;
    },

  
  },
};