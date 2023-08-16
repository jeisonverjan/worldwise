import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const apiKey = process.env.VITE_REACT_APP_API_KEY;
const authDomain = process.env.VITE_REACT_APP_AUTH_DOMAIN;
const projectId = process.env.VITE_REACT_APP_PROJECT_ID;
const storageBucket = process.env.VITE_REACT_APP_STORAGE_BUCKET;
const messagingSenderId = process.env.VITE_REACT_APP_MESSAGING_SENDER_ID;
const appId = process.env.VITE_REACT_APP_APP_ID;

console.log(apiKey, "apiKey");
console.log(authDomain, "AuthDomain");

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
