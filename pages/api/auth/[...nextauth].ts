import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_APPID,
};

initializeApp(firebaseConfig);

const auth = getAuth();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        return signInWithEmailAndPassword(
          auth,
          credentials?.email ?? "",
          credentials?.password ?? ""
        )
          .then((userCredential): User => {
            return {
              id: userCredential.user.uid,
              name: userCredential.user.displayName,
              email: userCredential.user.email,
            };
          })
          .catch(() => {
            return null;
          });
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
});
