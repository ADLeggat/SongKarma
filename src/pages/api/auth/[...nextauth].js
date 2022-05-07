import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { login } from "~/controllers/user";

export default NextAuth({
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials) {
                const res = await login(credentials);
                if(res.user) {
                    return res.user;
                } else {
                    throw new Error(res.message);
                }
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if(user) {
                token = {...token, user};
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.user;
            return session;
        }
    }
});