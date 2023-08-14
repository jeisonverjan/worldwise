import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

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
