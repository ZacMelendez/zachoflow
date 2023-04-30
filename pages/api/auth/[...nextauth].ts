import NextAuth, { Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    secret: process.env.SECRET,
    callbacks: {
        async session({
            session,
            user,
            token,
        }: {
            session: Session;
            user: User;
            token: any;
        }) {
            return { ...session, user: { ...session.user, id: token.sub } };
        },
    },
};
export default NextAuth(authOptions);
