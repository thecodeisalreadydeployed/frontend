import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const FirebaseCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
};

const app = initializeApp(FirebaseCredentials);

export const auth = getAuth(app);
