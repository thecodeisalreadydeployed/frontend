import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { initializeApp } from "firebase/app";
import { fetchSignInMethodsForEmail, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  projectId: process.env.FIREBASE_PROJECTID,
  appId: process.env.FIREBASE_APPID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async jwt({ account, token }) {
      if (account) {
        token.accessToken = account.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
    async signIn({ profile }) {
      const userEmail = profile.email;

      if (userEmail) {
        return fetchSignInMethodsForEmail(auth, userEmail).then((res) =>
          res.includes("password")
        );
      }

      return false;
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
});
