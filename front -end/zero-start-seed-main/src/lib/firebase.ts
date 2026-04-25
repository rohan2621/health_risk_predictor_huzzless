import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAATeiWkRVD5Jri4LjiQYC0y4PUYZYLLLU",
  authDomain: "phenomenia-detectator.firebaseapp.com",
  projectId: "phenomenia-detectator",
  storageBucket: "phenomenia-detectator.firebasestorage.app",
  messagingSenderId: "707667059528",
  appId: "1:707667059528:web:0fbcae144008d3f0dbc97d",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
