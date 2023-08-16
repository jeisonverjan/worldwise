import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
const authDomain = import.meta.env.VITE_REACT_APP_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_REACT_APP_PROJECT_ID;
const storageBucket = import.meta.env.VITE_REACT_APP_STORAGE_BUCKET;
const messagingSenderId = import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID;
const appId = import.meta.env.VITE_REACT_APP_APP_ID;

console.log(apiKey, "apiKey");
console.log(authDomain, "AuthDomain");
console.log(projectId);
console.log(storageBucket);
console.log(messagingSenderId);
console.log(appId);

const firebaseConfig = {
  apiKey: "AIzaSyB7fLz2QfOikrgXAaFdsBQZ-DeKLvwCxTM",
  authDomain: "worldwise-v2.firebaseapp.com",
  projectId: "worldwise-v2",
  storageBucket: "worldwise-v2.appspot.com",
  messagingSenderId: "523567399900",
  appId: "1:523567399900:web:df69c37feca4a51909c519",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
