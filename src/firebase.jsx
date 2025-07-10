
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBo7b5DzCD2dJetsMth-Caszb3O68FDP0",
  authDomain: "weight-cheque.firebaseapp.com",
  projectId: "weight-cheque",
  storageBucket: "weight-cheque.appspot.com", // ✅ fixed
  messagingSenderId: "778762543034",
  appId: "1:778762543034:web:9e9cb4a258b7cac7c6c783",
  measurementId: "G-SHN52GJGJ3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null; // optional check for SSR

// Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, analytics, googleProvider };
