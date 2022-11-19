// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMaURyGs0AE640D0tF2Vep_utlwXiMqX8",
  authDomain: "meme-generator-60135.firebaseapp.com",
  projectId: "meme-generator-60135",
  storageBucket: "meme-generator-60135.appspot.com",
  messagingSenderId: "33071139708",
  appId: "1:33071139708:web:7d9950ea985943436af2f9",
  measurementId: "G-7XY2M87WZV",
};

// Initialize Firebase and Firebase Authentication
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
