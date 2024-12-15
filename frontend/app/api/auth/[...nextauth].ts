/* eslint-disable @typescript-eslint/no-explicit-any */


import axios from "axios";

import NextAuth, { Session } from "next-auth";

import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials:{
                email: {label: "email", type: "text", placeholder: "johndoe@gmail.com"},
                password:{label: "password", type: "text", placeholder: "12345678"}
            },
            async authorize(credentials) {
                console.log("A")
                try {
                    const res = await axios.post(`http://localhost:8787/api/v1/user/signin`, {
                        email: credentials?.email,
                        password: credentials?.password
                    })
                    console.log("B")
                    
                    const user = res.data.user;
    
                    if(res.status == 200 && user){
                        return {id: user.id, email: user.email, role: user.role};
                    }
    
                    return null;
                } catch (error) {
                    console.error(error);
                    return null;
                    
                }
            },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET ?? "secret",
    
    
    callbacks: {
       
        async jwt({token, user}:{
            token: JWT,
            user: any
        }){
            if(user){
                token.id = user.id
                token.email = user.email
                token.role = user.role
            }

            return token;
        },
        async session({session, token}:{
            session: Session,
            token: JWT
        }){
            session.user = {
                id: token.id as string,
                email: token.email as string,
                role: token.role as string,

            }
            return session;
        },

        
    },
    
    
    
}

export default NextAuth(authOptions);