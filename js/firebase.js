import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";  
import { getAuth } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";  
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";  

const firebaseConfig = {  
  apiKey: "AIzaSyBfOy7YddmS91rxtXmPMu-9KStlvMRUFCI",  
  authDomain: "jazzfree-live.firebaseapp.com",  
  projectId: "jazzfree-live",  
  storageBucket: "jazzfree-live.firebasestorage.app",  
  messagingSenderId: "826568103515",  
  appId: "1:826568103515:web:c31891640bcf2613b9d17e",  
  databaseURL: "https://jazzfree-live-default-rtdb.asia-southeast1.firebasedatabase.app/"  
};  

export const app = initializeApp(firebaseConfig);  
export const auth = getAuth(app);  
export const db = getDatabase(app);
