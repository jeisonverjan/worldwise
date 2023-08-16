import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
const authDomain = import.meta.env.VITE_REACT_APP_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_REACT_APP_PROJECT_ID;
const storageBucket = import.meta.env.VITE_REACT_APP_STORAGE_BUCKET;
const messagingSenderId = import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID;
const appId = import.meta.env.VITE_REACT_APP_APP_ID;

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
