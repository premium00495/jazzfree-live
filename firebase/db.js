// firebase/db.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBfOy7YddmS91rxtXmPMu-9KStlvMRUFCI",
  authDomain: "jazzfree-live.firebaseapp.com",
  projectId: "jazzfree-live",
  storageBucket: "jazzfree-live.firebasestorage.app",
  messagingSenderId: "826568103515",
  appId: "1:826568103515:web:c31891640bcf2613b9d17e",
  databaseURL: "https://jazzfree-live-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const rtdb = getDatabase(app);