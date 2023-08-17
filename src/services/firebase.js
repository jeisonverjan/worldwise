import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const apiKey = import.meta.env.VITE_MY_API_KEY;
const authDomain = import.meta.env.VITE_MY_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_MY_PROJECT_ID;
const storageBucket = import.meta.env.VITE_MY_STORAGE_BUCKET;
const messagingSenderId = import.meta.env.VITE_MY_MESSAGING_SENDER_ID;
const appId = import.meta.env.VITE_MY_APP_ID;

console.log(apiKey);
console.log(authDomain);
console.log(projectId);
console.log(storageBucket);
console.log(messagingSenderId);
console.log(appId);

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
